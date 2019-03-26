using System.Threading.Tasks;
using ProAgil.Domain;

namespace ProAgil.Repository
{
    public interface IProAgilRepository
    {
         void Add<T>(T entity) where T : class;
         void Update<T>(T entity) where T : class;
         void Delete<T>(T entity) where T : class; 
         Task<bool> SaveChangesAsync();

         //EVENTOS
         Task<Evento[]> GetAllEventoAsyncByTema(string tema, bool includePalestrantes = false);
         Task<Evento[]> GetAllEventoAsync(bool includePalestrantes = false);
         Task<Evento> GetAllEventoAsyncById(int eventoId, bool includePalestrantes = false);

         //PALESTRANTE
         Task<Palestrante[]> GetAllPalestranteAsyncByName(string nome, bool includeEventos = false);
         Task<Palestrante> GetPalestranteAsyncById(int palestranteId, bool includeEventos = false);
    }
}