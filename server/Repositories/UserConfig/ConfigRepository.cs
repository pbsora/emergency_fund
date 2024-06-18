using AutoMapper;
using Microsoft.EntityFrameworkCore;
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

        public Task<Config> GetConfig(string userId)
        {
            throw new NotImplementedException();
        }

        public async Task<Boolean> CreateConfig(CreateConfigDTO configDTO)
        {
            Boolean configExits = await _context.Config.AnyAsync(c => c.UserId == configDTO.UserId);

            if (configExits)
                return false;

            Config config = _mapper.Map<Config>(configDTO);
            await _context.Config.AddAsync(config);
            await _context.SaveChangesAsync();

            return true;
        }

        public Task<Config> UpdateConfig(UpdateConfigDTO configDTO)
        {
            throw new NotImplementedException();
        }
    }
}
