using AutoMapper;
using server.DTOs.UserConfig;
using server.Model;

namespace server.Repositories.UserConfig
{
    public class ConfigDTOMappingProfile : Profile
    {
        public ConfigDTOMappingProfile()
        {
            CreateMap<Config, CreateConfigDTO>().ReverseMap();
            CreateMap<Config, GetConfigDTO>().ReverseMap();
            CreateMap<Config, ConfigDTO>().ReverseMap();
        }
    }
}
