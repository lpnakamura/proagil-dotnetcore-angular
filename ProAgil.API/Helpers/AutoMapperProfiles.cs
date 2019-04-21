using System.Linq;
using AutoMapper;
using ProAgil.API.Dtos;
using ProAgil.Domain;

namespace ProAgil.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Evento, EventoDto>()
            .ForMember(dest => dest.Palestrantes, opc => { 
                opc.MapFrom(src => src.PalestrantesEventos.Select(p => p.Palestrante).ToList());
            }).ReverseMap();
            
            CreateMap<Palestrante, PalestranteDto>()
            .ForMember(dest => dest.Eventos, opc => {
                opc.MapFrom(src => src.PalestrantesEventos.Select(e => e.Evento).ToList());
            }).ReverseMap();

            CreateMap<Lote, LoteDto>().ReverseMap();
            CreateMap<RedeSocial, RedeSocialDto>().ReverseMap();
        }
    }
}