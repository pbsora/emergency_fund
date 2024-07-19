using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.DTOs.Auth;
using server.Model;
using server.Services;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        public readonly UserManager<ApplicationUser> _userManager;
        public readonly SignInManager<ApplicationUser> _signInManager;
        private readonly ITokenService _tokenService;

        public AuthController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            ITokenService tokenService
        )
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<object>> RegisterAsync([FromBody] RegisterDTO registerDTO)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(
                        new { message = ModelState.Values.First().Errors.First().ErrorMessage }
                    );
                }

                if (registerDTO.Password != registerDTO.ConfirmPassword)
                {
                    return BadRequest(new { message = "Passwords do not match" });
                }

                ApplicationUser user = new ApplicationUser
                {
                    Name = registerDTO.Name,
                    Email = registerDTO.Email,
                    UserName = registerDTO.Username
                };

                var result = await _userManager.CreateAsync(user, registerDTO.Password);

                if (!result.Succeeded)
                    return BadRequest(new { message = result.Errors.First().Description });

                var roleResult = await _userManager.AddToRoleAsync(user, "User");

                if (!roleResult.Succeeded)
                    return BadRequest(new { message = "User could not be assigned to role" });

                return Ok(new { message = "User registered successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("login")]
        public async Task<ActionResult<object>> LoginAsync([FromBody] LoginDTO loginDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { message = "Invalid login request" });

            if (string.IsNullOrEmpty(loginDTO.Password) || string.IsNullOrEmpty(loginDTO.Username))
                return BadRequest(new { message = "One or more fields are empty" });

            var user = await _userManager.FindByNameAsync(loginDTO.Username);

            if (user == null || !await _userManager.CheckPasswordAsync(user, loginDTO.Password))
                return Unauthorized(new { message = "Invalid username or password" });

            var userRoles = await _userManager.GetRolesAsync(user);

            //Generate Token and Refresh Token
            var token = _tokenService.CreateToken(user, userRoles.ToList());
            var refreshToken = Uri.EscapeDataString(_tokenService.GenerateRefreshToken());
            user.RefreshToken.ExpiryTime = DateTime.Now.AddMinutes(60 * 24);
            user.RefreshToken.Token = refreshToken;

            await _userManager.UpdateAsync(user);

            SaveToken("token", token);
            SaveToken("refresh-token", refreshToken);

            return Ok(new { message = "Login successful" });
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> RefreshTokenAsync()
        {
            string? accessToken =
                Request.Cookies["token"] ?? throw new ArgumentNullException(nameof(accessToken));
            string? refreshToken =
                Request.Cookies["refresh-token"]
                ?? throw new ArgumentNullException(nameof(refreshToken));

            var principal = _tokenService.GetPrincipalFromExpiredToken(accessToken!);

            if (principal == null)
                return BadRequest(new { message = "Invalid access/refresh token" });

            string? username = principal.Identity!.Name;

            var user = await _userManager.FindByNameAsync(username!);

            if (user == null || user.RefreshToken.ExpiryTime < DateTime.Now)
            {
                return BadRequest(new { message = "Invalid access token/refresh token" });
            }
            var userRoles = await _userManager.GetRolesAsync(user);

            var newAccessToken = _tokenService.CreateToken(user, userRoles.ToList());
            var newRefreshToken = Uri.EscapeDataString(_tokenService.GenerateRefreshToken());

            user.RefreshToken.Token = newRefreshToken;

            await _userManager.UpdateAsync(user);

            SaveToken("token", newAccessToken);
            SaveToken("refresh-token", newRefreshToken);

            return Ok(new { message = "Login successful" });
        }

        [HttpPost("logout")]
        public async Task<ActionResult<object>> Logout()
        {
            try
            {
                var userId = User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value;

                var user = await _userManager.FindByIdAsync(userId);

                if (user == null)
                    return BadRequest(new { message = "User not found" });

                user.RefreshToken.Token = null;
                user.RefreshToken.ExpiryTime = DateTime.Now;
                await _userManager.UpdateAsync(user);

                SaveToken("token", "");

                return Ok(new { message = "Logout successful" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("isAuthenticated")]
        public ActionResult isAuthenticated()
        {
            var isAuthenticated = User.Identity!.IsAuthenticated;

            return Ok(isAuthenticated);
        }

        [Authorize]
        [HttpGet("info")]
        public async Task<ActionResult<UserInfoDTO>> GetUserInfo()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            var user = await _userManager.FindByIdAsync(userId!);

            if (user == null)
            {
                return Unauthorized(new { message = "User not found" });
            }

            UserInfoDTO userInfo = new UserInfoDTO
            {
                UserId = userId,
                Name = user.Name,
                Email = User.FindFirst(ClaimTypes.Email)?.Value,
                Username = User.FindFirst(ClaimTypes.GivenName)?.Value,
                ProfilePicture = user.ProfilePicture.Url
            };

            return Ok(userInfo);
        }

        private void SaveToken(string name, string token)
        {
            HttpContext.Response.Cookies.Append(
                name,
                token,
                new CookieOptions
                {
                    HttpOnly = true,
                    SameSite = SameSiteMode.None,
                    Secure = true,
                    IsEssential = true
                }
            );
        }
    }
}
