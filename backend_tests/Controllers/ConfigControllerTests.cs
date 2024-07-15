using backend_tests.Config;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Moq;
using server.Controllers;
using server.DTOs.UserConfig;
using server.Model;
using server.Repositories.UserConfig;
using System.Security.Claims;

namespace backend_tests.Controllers
{
    public class ConfigControllerTests
    {

        private readonly Mock<IConfigRepository> _configRepository;
        private readonly Mock<UserManager<ApplicationUser>> _userManager;

        public ConfigControllerTests()
        {
            _configRepository = new Mock<IConfigRepository>();

            var users = new List<ApplicationUser>
            {
                new ApplicationUser { Id = "1", UserName = "user1", Name = "Sora" },
                new ApplicationUser { Id = "2", UserName = "user2", Name = "Sora" }
            };

            _userManager = UserManagerMock.CreateMockUserManager<ApplicationUser>(users);
        }

        public ControllerContext GetControllerContext(string userId)
        {
            var claims = new List<Claim> { new Claim(ClaimTypes.NameIdentifier, userId) };
            var identity = new ClaimsIdentity(claims, "TestAuthType");
            var claimsPrincipal = new ClaimsPrincipal(identity);

            var mockHttpContext = new Mock<HttpContext>();
            mockHttpContext.Setup(context => context.User).Returns(claimsPrincipal);

            // Mock the Response object to avoid exceptions when setting headers
            var response = new Mock<HttpResponse>();
            var responseHeaders = new HeaderDictionary();
            response.SetupGet(r => r.Headers).Returns(responseHeaders);

            mockHttpContext.Setup(context => context.Response).Returns(response.Object);

            return new ControllerContext { HttpContext = mockHttpContext.Object };
        }

        public ConfigController GetController(string userId)
        {
            var controllerContext = GetControllerContext(userId);
            return new ConfigController(
                               _configRepository.Object,
                                              _userManager.Object
                                                         )
            {
                ControllerContext = controllerContext
            };
        }



        [Fact]
        public async Task GetAsync_ValidRequest_ReturnsConfig()
        {
            // Arrange
            var userId = Guid.NewGuid();
            var controller = GetController(userId.ToString());

            GetConfigDTO config = new GetConfigDTO
            {
                Id = Guid.NewGuid(),
                UserId = userId.ToString(),
                Months = 12,
                MonthlyExpenses = 1000,
            };

            _configRepository.Setup(x => x.GetConfig(userId.ToString())).ReturnsAsync(config);

            // Act

            var result = await controller.GetAsync();

            // Assert

            var okResult = result.Result as OkObjectResult;
            okResult.Should().BeOfType<OkObjectResult>().Which.StatusCode.Should().Be(200);

            var configResult = okResult?.Value as GetConfigDTO;
            configResult.Should().BeEquivalentTo(config);
        }


        [Fact]
        public async Task GetAsync_InvalidRequest_ReturnsNotFound()
        {
            // Arrange
            var userId = Guid.NewGuid();
            var controller = GetController(userId.ToString());

            _configRepository.Setup(x => x.GetConfig(userId.ToString())).ThrowsAsync(new KeyNotFoundException());

            // Act

            var result = await controller.GetAsync();

            // Assert

            var notFoundResult = result.Result as NotFoundObjectResult;
            notFoundResult.Should().BeOfType<NotFoundObjectResult>().Which.StatusCode.Should().Be(404);
        }


        [Fact]
        public async Task GetAsync_InvalidUserId_ReturnsUnauthorized()
        {
            // Arrange
            var userId = string.Empty;
            var controller = GetController(userId);

            // Act

            var result = await controller.GetAsync();

            // Assert

            var unauthorizedResult = result.Result as UnauthorizedObjectResult;
            unauthorizedResult.Should().BeOfType<UnauthorizedObjectResult>().Which.StatusCode.Should().Be(401);

        }


        [Fact]
        public async Task PostAsync_ValidRequest_ReturnsOk()
        {
            // Arrange
            Guid userId = Guid.NewGuid();
            var controller = GetController(userId.ToString());

            CreateConfigDTO config = new CreateConfigDTO
            {
                UserId = userId.ToString(),
                Months = 12,
                MonthlyExpenses = 1000,
            };

            _configRepository.Setup(x => x.CreateConfig(config)).ReturnsAsync(true);

            // Act

            var result = await controller.PostAsync(config);

            // Assert

            var okResult = result.Result as OkObjectResult;
            okResult.Should().BeOfType<OkObjectResult>().Which.StatusCode.Should().Be(200);

        }


        [Fact]
        public async Task PostAsync_InvalidRequest_ReturnsBadRequest()
        {
            // Arrange
            var userId = Guid.NewGuid();
            var controller = GetController(userId.ToString());

            controller.ModelState.AddModelError("Months", "The Months field is required.");

            // Act

            var result = await controller.PostAsync(new CreateConfigDTO());

            // Assert

            var badRequestResult = result.Result as BadRequestObjectResult;
            badRequestResult.Should().BeOfType<BadRequestObjectResult>().Which.StatusCode.Should().Be(400);
        }


        [Fact]
        public async Task PostAsync_ConfigExists_ReturnsBadRequest()
        {
            // Arrange
            var userId = Guid.NewGuid();
            var controller = GetController(userId.ToString());

            CreateConfigDTO config = new CreateConfigDTO
            {
                UserId = userId.ToString(),
                Months = 12,
                MonthlyExpenses = 1000,
            };

            _configRepository.Setup(x => x.CreateConfig(config)).ThrowsAsync(new InvalidOperationException());

            // Act

            var result = await controller.PostAsync(config);

            // Assert

            var badRequestResult = result.Result as BadRequestObjectResult;
            badRequestResult.Should().BeOfType<BadRequestObjectResult>().Which.StatusCode.Should().Be(400);
        }


        [Fact]
        public async Task PostAsync_InvalidUserId_ReturnsUnathorized()
        {
            // Arrange
            var userId = string.Empty;
            var controller = GetController(userId);

            // Act

            var result = await controller.PostAsync(new CreateConfigDTO());

            // Assert

            var unauthorizedResult = result.Result as UnauthorizedObjectResult;
            unauthorizedResult.Should().BeOfType<UnauthorizedObjectResult>().Which.StatusCode.Should().Be(401);

        }


        [Fact]
        public async Task PutAsync_ValidRequest_ReturnsOk()
        {
            // Arrange
            var userId = Guid.NewGuid();
            var controller = GetController(userId.ToString());

            ConfigDTO config = new ConfigDTO
            {
                UserId = userId.ToString(),
                Months = 12,
                MonthlyExpenses = 1000,
            };

            GetConfigDTO oldConfig = new GetConfigDTO
            {
                Id = Guid.NewGuid(),
                UserId = userId.ToString(),
                Months = 12,
                MonthlyExpenses = 1000,
            };

            _configRepository.Setup(x => x.UpdateConfig(config)).ReturnsAsync(config);
            _configRepository.Setup(x => x.GetConfig(userId.ToString())).ReturnsAsync(oldConfig);

            // Act

            var result = await controller.PutAsync(config);

            // Assert

            var okResult = result.Result as OkObjectResult;
            okResult.Should().BeOfType<OkObjectResult>().Which.StatusCode.Should().Be(200);
        }


        [Fact]
        public async Task PutAsync_InexistentConfig_ReturnsBadRequest()
        {
            // Arrange
            var userId = Guid.NewGuid();
            var controller = GetController(userId.ToString());

            _configRepository.Setup(x => x.GetConfig(userId.ToString())).ThrowsAsync(new InvalidOperationException());

            // Act

            var result = await controller.PutAsync(new ConfigDTO());

            // Assert

            var badRequestResult = result.Result as BadRequestObjectResult;
            badRequestResult.Should().BeOfType<BadRequestObjectResult>().Which.StatusCode.Should().Be(400);

        }


        [Fact]
        public async Task PutAsync_InvalidModelState_ReturnsBadRequest()
        {
            // Arrange
            var userId = Guid.NewGuid();
            var controller = GetController(userId.ToString());

            controller.ModelState.AddModelError("Months", "The Months field is required.");

            // Act

            var result = await controller.PutAsync(new ConfigDTO());

            // Assert

            var badRequestResult = result.Result as BadRequestObjectResult;
            badRequestResult.Should().BeOfType<BadRequestObjectResult>().Which.StatusCode.Should().Be(400);

        }


        [Fact]
        public async Task PutAsync_InvalidUserId_ReturnsUnauthorized()
        {
            // Arrange
            var userId = string.Empty;
            var controller = GetController(userId);

            // Act

            var result = await controller.PutAsync(new ConfigDTO());

            // Assert

            var unauthorizedResult = result.Result as UnauthorizedObjectResult;
            unauthorizedResult.Should().BeOfType<UnauthorizedObjectResult>().Which.StatusCode.Should().Be(401);
        }


        [Fact]
        public async Task ChangeName_ValidName_ReturnsOk()
        {
            // Arrange
            var userId = "1";
            var controller = GetController(userId.ToString());

            // Act

            var result = await controller.ChangeName("NewName");

            // Assert

            var okResult = result as OkObjectResult;
            okResult.Should().BeOfType<OkObjectResult>().Which.StatusCode.Should().Be(200);

        }

    }
}
