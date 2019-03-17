using System;

namespace ProAgil.API.Model
{
    public class Evento
    {
        public int EventoId { get; set; }
        public string Local { get; set; }
        public DateTime DataEvento { get; set; }
        public string  Tema { get; set; }
        public int QtdPessoa { get; set; }
        public string Lote { get; set; }
        public string ImagemURL { get; set; }


    }
}