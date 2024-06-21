using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.PortableExecutable;
using System.Security.Claims;
using System.Threading.Tasks;
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

        public ConfigController(IConfigRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<ActionResult<GetConfigDTO>> GetAsync()
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                if (String.IsNullOrEmpty(userId))
                    return BadRequest("Not logged in");

                GetConfigDTO config = await _repository.GetConfig(userId);

                if (config == null)
                    return NotFound("Configuration not found!");

                return Ok(config);
            }
            catch (Exception)
            {
                return StatusCode(500, "Something went wrong!");
            }
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] CreateConfigDTO configDTO)
        {
            try
            {
                Boolean config = await _repository.CreateConfig(configDTO);

                if (config == false)
                    return BadRequest(
                        "User configuration already exists, please update it instead!"
                    );

                return Ok("User configuration created successfully!");
            }
            catch (Exception e)
            {
                return BadRequest(e.Data);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsync(
            string id,
            [FromBody] UpdateConfigDTO updateConfigDTO
        )
        {
            try
            {
                GetConfigDTO oldConfig = await _repository.GetConfig(id);

                if (oldConfig == null || id != oldConfig.UserId!.ToString())
                {
                    return BadRequest("Configuration error!");
                }

                await _repository.UpdateConfig(updateConfigDTO);

                return Ok("Configuration updated with success!");
            }
            catch (Exception e)
            {
                return BadRequest(e.Data);
            }
        }
    }
}
