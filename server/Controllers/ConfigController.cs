using System.Security.Claims;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using server.DTOs.UserConfig;
using server.Model;
using server.Repositories.UserConfig;

namespace server.Controllers
{
    [ApiController]
    [Route("api/config")]
    public class ConfigController : ControllerBase
    {
        private readonly IConfigRepository _repository;
        public readonly UserManager<ApplicationUser> _userManager;

        public ConfigController(
            IConfigRepository repository,
            UserManager<ApplicationUser> userManager
        )
        {
            _repository = repository;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<ActionResult<GetConfigDTO>> GetAsync()
        {
            try
            {
                string? userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                if (String.IsNullOrEmpty(userId))
                    return Unauthorized(new { message = "Not logged in!" });

                GetConfigDTO config = await _repository.GetConfig(userId);

                if (config == null)
                    return NotFound(new { message = "User configuration not found!" });

                return Ok(config);
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }

        [HttpPost]
        public async Task<ActionResult<object>> PostAsync([FromBody] CreateConfigDTO configDTO)
        {
            try
            {
                string? userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                if (String.IsNullOrEmpty(userId))
                    return Unauthorized(new { message = "Not logged in!" });

                if (!ModelState.IsValid)
                    return BadRequest(
                        new { message = ModelState.Values.First().Errors.First().ErrorMessage }
                    );

                Boolean config = await _repository.CreateConfig(configDTO);

                if (config == false)
                    return BadRequest(
                        new
                        {
                            message = "User configuration already exists, please update it instead!"
                        }
                    );

                return Ok(new { message = "User configuration created successfully!" });
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }

        [HttpPut]
        public async Task<ActionResult<object>> PutAsync([FromBody] ConfigDTO updateConfigDTO)
        {
            try
            {
                string? userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                if (string.IsNullOrEmpty(userId))
                    return Unauthorized(new { message = "Not logged in!" });

                if (!ModelState.IsValid)
                    return BadRequest(
                        new { message = ModelState.Values.First().Errors.First().ErrorMessage }
                    );

                // GetConfigDTO oldConfig = await _repository.GetConfig(userId);

                // if (oldConfig == null || userId != oldConfig.UserId!.ToString())
                // {
                //     return BadRequest(new { message = "Configuration does not exist!" });
                // }

                await _repository.UpdateConfig(updateConfigDTO);

                return Ok(new { message = "Configuration updated with success!" });
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }

        [HttpPatch("profile-picture")]
        public async Task<ActionResult<object>> UploadImage(IFormFile image)
        {
            try
            {
                if (image == null)
                    return BadRequest(new { message = "Image not valid!" });

                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                if (String.IsNullOrEmpty(userId))
                    return Unauthorized(new { message = "Not logged in!" });

                var user = await _userManager.FindByIdAsync(userId);
                if (user == null)
                    return BadRequest(new { message = "User not found!" });

                Cloudinary cloudinary = new Cloudinary(
                    Environment.GetEnvironmentVariable("CLOUDINARY_URL")
                );
                cloudinary.Api.Secure = true;

                string[] allowedExtensions = [".png", ".jpg", ".jpeg"];
                string fileExtension = Path.GetExtension(image.FileName).ToLower();
                if (!allowedExtensions.Contains(fileExtension))
                {
                    return BadRequest(
                        new
                        {
                            message = "Invalid file format. Only PNG, JPG, and JPEG files are allowed."
                        }
                    );
                }

                var uploadParams = new ImageUploadParams()
                {
                    File = new FileDescription(image.FileName, image.OpenReadStream()),
                    UseFilename = true,
                    UniqueFilename = true,
                    Overwrite = true,
                    AllowedFormats = ["png", "jpg", "jpeg"],
                    Folder = "emergency_fund"
                };

                var uploadResult = await cloudinary.UploadAsync(uploadParams);
                if (uploadResult.Error != null)
                    return BadRequest(uploadResult.Error.Message);

                // Delete previous profile picture if not default picture
                if (user.ProfilePicture.PublicId != "Default")
                {
                    var deleteParams = new DeletionParams(user.ProfilePicture.PublicId)
                    {
                        ResourceType = ResourceType.Image
                    };

                    var deleteResult = await cloudinary.DestroyAsync(deleteParams);

                    if (deleteResult.Error != null)
                        return BadRequest(new { deleteResult.Error.Message });
                }

                user.ProfilePicture.Url = uploadResult.SecureUrl.AbsoluteUri;
                user.ProfilePicture.PublicId = uploadResult.PublicId;

                var res = await _userManager.UpdateAsync(user);

                if (!res.Succeeded)
                    return BadRequest(new { message = "Error updating user profile picture!" });

                return Ok(new { message = "Successfully changed profile picture!" });
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }

        [HttpPatch("name/{name}")]
        public async Task<IActionResult> ChangeName(string name)
        {
            try
            {
                if (String.IsNullOrEmpty(name) || name.Length < 2 || name.Length > 30)
                    return BadRequest(new { message = "Name not valid!" });

                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                if (String.IsNullOrEmpty(userId))
                    return Unauthorized(new { message = "Not logged in!" });

                var user = await _userManager.FindByIdAsync(userId);

                if (user == null)
                    return NotFound(new { message = "User not found!" });

                user.Name = name.ToLower();

                var res = await _userManager.UpdateAsync(user);

                if (!res.Succeeded)
                    return BadRequest(new { message = "Error updating user name!" });

                return Ok(new { message = "Successfully changed user name!" });
            }
            catch (Exception)
            {
                return StatusCode(500, new { message = "Something went wrong!" });
            }
        }

        [HttpPatch("months/{months}")]
        public async Task<ActionResult<object>> ChangeMonthsAsync(int months)
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                if (String.IsNullOrEmpty(userId))
                    return Unauthorized(new { message = "Not logged in!" });

                var res = await _repository.UpdateMonths(months, userId);

                if (res == false)
                    return BadRequest(new { message = "Error updating months!" });

                return Ok(new { message = "Successfully changed months!" });
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }

        private ActionResult HandleException(Exception e)
        {
            if (e is InvalidOperationException || e is ArgumentNullException)
            {
                return BadRequest(new { message = e.Message });
            }

            if (e is KeyNotFoundException)
            {
                return NotFound(new { message = e.Message });
            }

            return StatusCode(500, new { message = "Something went wrong!" });
        }
    }
}
