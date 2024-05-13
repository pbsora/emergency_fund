using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using server.DTOs.Auth;
using server.Model;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        public readonly UserManager<ApplicationUser> _userManager;

        public AuthController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpPost("register")]
        public async Task<IActionResult> PostAsync([FromBody] RegisterDTO registerDTO)
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
    }
}
