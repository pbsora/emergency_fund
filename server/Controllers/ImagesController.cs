using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ImagesController : ControllerBase
    {
        [Authorize]
        [HttpGet("{imageName}")]
        public IActionResult GetImage(string imageName)
        {
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "Images", imageName);

            if (!System.IO.File.Exists(filePath))
            {
                return NotFound();
            }

            var image = System.IO.File.OpenRead(filePath);
            return File(image, "image/png");
        }

        [HttpPost]
        public async Task<IActionResult> UploadImage(IFormFile image)
        {
            if (image == null)
            {
                return BadRequest();
            }

            string[] allowedExtensions = [".png", ".jpg", ".jpeg"];
            string fileExtension = Path.GetExtension(image.FileName).ToLower();

            if (!allowedExtensions.Contains(fileExtension))
            {
                return BadRequest(
                    "Invalid file format. Only PNG, JPG, and JPEG files are allowed."
                );
            }

            Cloudinary cloudinary = new Cloudinary(
                Environment.GetEnvironmentVariable("CLOUDINARY_URL")
            );
            cloudinary.Api.Secure = true;

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

            return Ok(uploadResult.JsonObj);
        }
    }
}
