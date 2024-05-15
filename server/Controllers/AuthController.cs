using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
        public async Task<IActionResult> RegisterAsync([FromBody] RegisterDTO registerDTO)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                if (registerDTO.Password != registerDTO.ConfirmPassword)
                {
                    return BadRequest("Passwords do not match");
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
        public async Task<IActionResult> LoginAsync([FromBody] LoginDTO loginDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { message = "Invalid login request" });

            if (string.IsNullOrEmpty(loginDTO.Password) || string.IsNullOrEmpty(loginDTO.Username))
                return BadRequest(new { message = "One or more fields are empty" });

            var user = await _userManager.Users.FirstOrDefaultAsync(u =>
                u.UserName == loginDTO.Username.ToLower()
            );

            if (user == null)
                return Unauthorized(new { message = "Invalid username or password" });

            if (string.IsNullOrEmpty(loginDTO.Password))
                return BadRequest(new { message = "Password is empty" });

            var res = await _signInManager.CheckPasswordSignInAsync(user, loginDTO.Password, false);

            var userRoles = await _userManager.GetRolesAsync(user);

            HttpContext.Response.Cookies.Append(
                "token",
                _tokenService.CreateToken(user, userRoles.ToList()),
                new CookieOptions
                {
                    HttpOnly = true,
                    SameSite = SameSiteMode.None,
                    Secure = true,
                    IsEssential = true
                }
            );

            return Ok("Logged in sucessfully");
        }
    }
}
