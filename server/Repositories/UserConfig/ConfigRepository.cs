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
                throw new Exception("Configuration not found!");

            return _mapper.Map<GetConfigDTO>(config);
        }

        public async Task<Boolean> CreateConfig(CreateConfigDTO configDTO)
        {
            Boolean configExists = await _context.Config.AnyAsync(c =>
                c.UserId == configDTO.UserId
            );

            if (configExists)
                return false;

            Config config = _mapper.Map<Config>(configDTO);
            await _context.Config.AddAsync(config);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<Config> UpdateConfig(UpdateConfigDTO configDTO)
        {
            Config config = _mapper.Map<Config>(configDTO);
            _context.Entry(config).State = EntityState.Modified;
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
