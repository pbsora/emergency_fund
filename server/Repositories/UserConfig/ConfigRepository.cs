using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration.UserSecrets;
using server.Data;
using server.DTOs.UserConfig;
using server.Model;

namespace server.Repositories.UserConfig
{
    public class ConfigRepository : IConfigRepository
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public ConfigRepository(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<GetConfigDTO> GetConfig(string userId)
        {
            Config? config = await _context.Config.FirstOrDefaultAsync(c => c.UserId == userId);

            if (config == null)
                throw new KeyNotFoundException("Configuration not found!");

            return _mapper.Map<GetConfigDTO>(config);
        }

        public async Task<Boolean> CreateConfig(CreateConfigDTO configDTO)
        {
            Boolean configExists = await _context.Config.AnyAsync(c =>
                c.UserId == configDTO.UserId
            );

            if (configExists)
                throw new InvalidOperationException(
                    "Configuration already exists, please update it instead!"
                );

            Config config = _mapper.Map<Config>(configDTO);
            await _context.Config.AddAsync(config);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<ConfigDTO> UpdateConfig(ConfigDTO config)
        {
            var oldConfig = await _context.Config.FirstOrDefaultAsync(c =>
                c.UserId == config.UserId
            );

            if (oldConfig == null || oldConfig.UserId != config.UserId)
                throw new KeyNotFoundException("Configuration not found!");

            _context.Entry(oldConfig).State = EntityState.Detached;

            var configToUpdate = _mapper.Map<Config>(config);
            _context.Entry(configToUpdate).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return config;
        }

        public async Task<bool> UpdateMonths(int months, string userId)
        {
            var config = await _context.Config.FirstOrDefaultAsync(c => c.UserId == userId);
            if (config == null)
                throw new KeyNotFoundException("Configuration not found!");

            config.Months = months;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
