using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProAgil.API.Dtos
{
    public class EventoDto
    {
        public int Id { get; set; }
        [Required]
        [StringLength(100, MinimumLength=3)]
        public string Local { get; set; }
        public string DataEvento { get; set; }
        [Required]
        public string  Tema { get; set; }
        [Range(MinPersons, 120000)]
        public int QtdPessoa { get; set; }
        public string ImagemUrl { get; set; }
        public string Telefone { get; set; }
        [EmailAddress]
        public string Email { get; set; } 
        public List<LoteDto> Lotes { get; set; }
        public List<RedeSocialDto> RedesSociais { get; set; }
        public List<PalestranteDto> Palestrantes { get; set; }

        public const int MinPersons = 3;
    }
}