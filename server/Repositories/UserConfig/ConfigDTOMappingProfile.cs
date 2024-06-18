using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
        }
    }
}
