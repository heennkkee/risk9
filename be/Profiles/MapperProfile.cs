using AutoMapper;
using risk9.Bindings;
using risk9.Models;

namespace risk9.Profiles {
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<AssetBinding, Asset>();
        }
    }
}