using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.PortableExecutable;
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
    }
}
