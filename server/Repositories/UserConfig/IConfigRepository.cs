using server.DTOs.UserConfig;
using server.Model;

namespace server.Repositories.UserConfig
{
    public interface IConfigRepository
    {
        public Task<GetConfigDTO> GetConfig(string userId);
        public Task<Boolean> CreateConfig(CreateConfigDTO configDTO);
        public Task<ConfigDTO> UpdateConfig(ConfigDTO config);
        public Task<bool> UpdateMonths(int month, string userId);
    }
}
