using server.DTOs.UserConfig;
using server.Model;

namespace server.Repositories.UserConfig
{
    public interface IConfigRepository
    {
        public Task<Config> GetConfig(string userId);
        public Task<Boolean> CreateConfig(CreateConfigDTO configDTO);
        public Task<Config> UpdateConfig(UpdateConfigDTO configDTO);
    }
}
