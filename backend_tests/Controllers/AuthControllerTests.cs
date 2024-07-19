using System.Dynamic;
using System.Security.Claims;
using backend_tests.Config;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
using server.Controllers;
using server.DTOs.Auth;
using server.Model;
using server.Services;

namespace backend_tests.Controllers
{
    public class AuthControllerTests
    {
        private readonly Mock<UserManager<ApplicationUser>> _userManager;
        private readonly Mock<SignInManager<ApplicationUser>> _signInManager;
        private readonly Mock<ITokenService> _tokenService;

        public AuthControllerTests()
        {
            var users = new List<ApplicationUser>
            {
                new ApplicationUser { Id = "1", UserName = "user1" },
                new ApplicationUser { Id = "2", UserName = "user2" }
            };

            _userManager = UserManagerMock.CreateMockUserManager<ApplicationUser>(users);

            var signInMock = new SignInManagerMock();
            _signInManager = signInMock.GetMockSignInManager();

            _tokenService = new Mock<ITokenService>();
        }

        public ControllerContext GetControllerContext(
            string userId,
            Mock<IResponseCookies> cookiesMock = null!
        )
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, userId),
                new Claim(ClaimTypes.Email, "user@test.com"),
                new Claim(ClaimTypes.GivenName, "testUser")
            };
            var identity = new ClaimsIdentity(claims, "TestAuthType");
            var claimsPrincipal = new ClaimsPrincipal(identity);

            var mockHttpContext = new Mock<HttpContext>();
            mockHttpContext.Setup(context => context.User).Returns(claimsPrincipal);

            // Mock the Response object to avoid exceptions when setting headers
            var response = new Mock<HttpResponse>();
            var responseHeaders = new HeaderDictionary();
            response.SetupGet(r => r.Headers).Returns(responseHeaders);

            // Mock the Cookies collection
            var cookies = new Mock<IResponseCookies>();
            response.SetupGet(r => r.Cookies).Returns(cookiesMock.Object);

            mockHttpContext.Setup(context => context.Response).Returns(response.Object);

            return new ControllerContext { HttpContext = mockHttpContext.Object };
        }

        public AuthController GetController(string userId)
        {
            var cookies = new Mock<IResponseCookies>();
            var controllerContext = GetControllerContext(userId, cookies);
            return new AuthController(
                _userManager.Object,
                _signInManager.Object,
                _tokenService.Object
            )
            {
                ControllerContext = controllerContext
            };
        }

        [Fact]
        public async void RegisterAsync_ValidRequest_ReturnsOk()
        {
            // Arrange
            var controller = new AuthController(
                _userManager.Object,
                _signInManager.Object,
                _tokenService.Object
            );

            RegisterDTO registerDTO = new RegisterDTO
            {
                Name = "Test",
                Email = "test@gmail.com",
                Username = "test",
                Password = "password",
                ConfirmPassword = "password"
            };

            _userManager
                .Setup(um => um.CreateAsync(It.IsAny<ApplicationUser>(), It.IsAny<string>()))
                .ReturnsAsync(IdentityResult.Success);

            _userManager
                .Setup(um => um.AddToRoleAsync(It.IsAny<ApplicationUser>(), It.IsAny<string>()))
                .ReturnsAsync(IdentityResult.Success);

            // Act
            var result = await controller.RegisterAsync(registerDTO);

            // Assert
            var okResult = result.Result as OkObjectResult;
            okResult.Should().BeOfType<OkObjectResult>();
        }

        [Fact]
        public async Task RegisterAsync_InvalidModel_ReturnsBadRequest()
        {
            // Arrange
            var controller = new AuthController(
                _userManager.Object,
                _signInManager.Object,
                _tokenService.Object
            );

            controller.ModelState.AddModelError("Test", "Test is required");

            // Act
            var result = await controller.RegisterAsync(new RegisterDTO());

            // Assert
            var badRequestResult = result.Result as BadRequestObjectResult;
            badRequestResult
                .Should()
                .BeOfType<BadRequestObjectResult>()
                .Which.StatusCode.Should()
                .Be(400);
        }

        [Fact]
        public async Task RegisterAsync_PasswordsNotMatch_ReturnBadRequest()
        {
            // Arrange
            var controller = new AuthController(
                _userManager.Object,
                _signInManager.Object,
                _tokenService.Object
            );

            RegisterDTO registerDTO = new RegisterDTO
            {
                Name = "Test",
                Email = "test@gmail.com",
                Username = "Test",
                Password = "123456",
                ConfirmPassword = "123456789"
            };

            // Act
            var result = await controller.RegisterAsync(registerDTO);

            // Assert
            var badRequestResult = result.Result as BadRequestObjectResult;
            badRequestResult
                .Should()
                .BeOfType<BadRequestObjectResult>()
                .Which.StatusCode.Should()
                .Be(400);
        }

        [Fact]
        public async Task LoginAsync_ValidRequest_ReturnsTokenAndOk()
        {
            // Arrange
            var userId = "1";
            var cookiesMock = new Mock<IResponseCookies>();
            var controllerContext = GetControllerContext(userId, cookiesMock);
            var controller = new AuthController(
                _userManager.Object,
                _signInManager.Object,
                _tokenService.Object
            )
            {
                ControllerContext = controllerContext
            };

            LoginDTO loginDTO = new LoginDTO { Username = "user1", Password = "password" };

            _userManager
                .Setup(um => um.FindByNameAsync(It.IsAny<string>()))
                .ReturnsAsync(new ApplicationUser { Id = "1", UserName = "user1" });
            _userManager
                .Setup(um => um.CheckPasswordAsync(It.IsAny<ApplicationUser>(), It.IsAny<string>()))
                .ReturnsAsync(true);
            _userManager
                .Setup(um => um.GetRolesAsync(It.IsAny<ApplicationUser>()))
                .ReturnsAsync(new List<string> { "User" });
            _userManager
                .Setup(um => um.UpdateAsync(It.IsAny<ApplicationUser>()))
                .ReturnsAsync(IdentityResult.Success);
            _tokenService
                .Setup(ts => ts.CreateToken(It.IsAny<ApplicationUser>(), It.IsAny<List<string>>()))
                .Returns("token");
            _tokenService.Setup(ts => ts.GenerateRefreshToken()).Returns("refresh-token");

            // Act
            var result = await controller.LoginAsync(loginDTO);

            // Assert
            var okResult = result.Result as OkObjectResult;
            okResult.Should().BeOfType<OkObjectResult>().Which.StatusCode.Should().Be(200);

            cookiesMock.Verify(
                c => c.Append("token", "token", It.IsAny<CookieOptions>()),
                Times.Once
            );
            cookiesMock.Verify(
                c => c.Append("refresh-token", "refresh-token", It.IsAny<CookieOptions>()),
                Times.Once
            );
        }

        [Fact]
        public async Task LoginAsync_InvalidModel_ReturnsBadRequest()
        {
            // Arrange
            var controller = GetController("1");
            controller.ModelState.AddModelError("Test", "Test is required");

            // Act
            var result = await controller.LoginAsync(new LoginDTO());

            // Assert
            var badRequestResult = result.Result as BadRequestObjectResult;
            badRequestResult
                .Should()
                .BeOfType<BadRequestObjectResult>()
                .Which.StatusCode.Should()
                .Be(400);
        }

        [Fact]
        public async Task LoginAsync_EmptyFields_ReturnsBadRequest()
        {
            // Arrange
            var controller = GetController("1");
            LoginDTO loginDTO = new LoginDTO { Username = "", Password = "" };

            // Act
            var result = await controller.LoginAsync(loginDTO);

            // Assert
            var badRequestResult = result.Result as BadRequestObjectResult;
            badRequestResult
                .Should()
                .BeOfType<BadRequestObjectResult>()
                .Which.StatusCode.Should()
                .Be(400);
        }

        [Fact]
        public async Task LoginAsync_InvalidPassword_ReturnsUnauthorized()
        {
            // Arrange
            var controller = GetController("1");
            LoginDTO loginDTO = new LoginDTO { Username = "user1", Password = "password" };

            _userManager
                .Setup(um => um.FindByNameAsync(It.IsAny<string>()))
                .ReturnsAsync(new ApplicationUser { Id = "1", UserName = "user1" });
            _userManager
                .Setup(um => um.CheckPasswordAsync(It.IsAny<ApplicationUser>(), It.IsAny<string>()))
                .ReturnsAsync(false);

            // Act
            var result = await controller.LoginAsync(loginDTO);

            // Assert
            var unauthorizedResult = result.Result as UnauthorizedObjectResult;
            unauthorizedResult
                .Should()
                .BeOfType<UnauthorizedObjectResult>()
                .Which.StatusCode.Should()
                .Be(401);
        }

        [Fact]
        public async Task GetUserInfo_ValidRequest_ReturnsUserInfo()
        {
            // Arrange
            var userId = "1";
            var controller = GetController(userId);

            var user = new ApplicationUser
            {
                Id = "1",
                UserName = "user1",
                Name = "Test User",
                ProfilePicture = new ProfilePicture()
            };

            _userManager.Setup(um => um.FindByIdAsync(It.IsAny<string>())).ReturnsAsync(user);

            // Act
            var result = await controller.GetUserInfo();

            // Assert
            var okResult = result.Result as OkObjectResult;
            okResult.Should().BeOfType<OkObjectResult>().Which.StatusCode.Should().Be(200);

            var userInfo = okResult?.Value as UserInfoDTO;
            userInfo.Should().BeOfType<UserInfoDTO>();
            userInfo?.UserId.Should().Be(user.Id);
            userInfo?.Username.Should().Be("testUser");
            userInfo?.ProfilePicture.Should().NotBeNull();
            userInfo?.Name.Should().Be("Test User");
            userInfo?.Email.Should().Be("user@test.com");
        }

        [Fact]
        public async Task GetUserInfo_InvalidUser_ReturnsUnauthorized()
        {
            // Arrange
            var controller = GetController("1");

            _userManager
                .Setup(um => um.FindByIdAsync(It.IsAny<string>()))
                .ReturnsAsync((ApplicationUser?)null);

            // Act
            var result = await controller.GetUserInfo();

            // Assert
            var unauthorizedResult = result.Result as UnauthorizedObjectResult;
            unauthorizedResult
                .Should()
                .BeOfType<UnauthorizedObjectResult>()
                .Which.StatusCode.Should()
                .Be(401);
        }
    }
}
