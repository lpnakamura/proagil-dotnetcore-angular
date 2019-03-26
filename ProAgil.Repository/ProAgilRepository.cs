using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ProAgil.Domain;

namespace ProAgil.Repository
{
    public class ProAgilRepository : IProAgilRepository
    {
        private readonly ProAgilContext _context;

        public ProAgilRepository(ProAgilContext context)
        {
            _context = context;
            _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }
        public void Update<T>(T entity) where T : class
        {
            _context.Update(entity);
        }
        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }
        public async Task<bool> SaveChangesAsync()
        {
            return (await _context.SaveChangesAsync()) > 0;
        }
        public async Task<Evento[]> GetAllEventoAsync(bool includePalestrantes = false)
        {
            IQueryable<Evento> query = _context.Eventos.Include(l => l.Lotes).Include(r => r.RedesSociais);

            if(includePalestrantes)
                query = query.Include(pe => pe.PalestrantesEventos).ThenInclude(p => p.Palestrante);

            query = query.OrderByDescending(o => o.DataEvento);

            return await query.ToArrayAsync();
        }

        public async Task<Evento> GetAllEventoAsyncById(int eventoId, bool includePalestrantes = false)
        {
            IQueryable<Evento> query = _context.Eventos.Include(l => l.Lotes).Include(r => r.RedesSociais);

            if(includePalestrantes)
                query = query.Include(pe => pe.PalestrantesEventos).ThenInclude(p => p.Palestrante);

            query = query.Where(i => i.Id == eventoId);

            return await query.FirstOrDefaultAsync();
        }

        public async Task<Evento[]> GetAllEventoAsyncByTema(string tema, bool includePalestrantes = false)
        {
           IQueryable<Evento> query = _context.Eventos.Include(l => l.Lotes).Include(r => r.RedesSociais);

            if(includePalestrantes)
                query = query.Include(pe => pe.PalestrantesEventos).ThenInclude(p => p.Palestrante);

            query = query.Where(t => t.Tema.Contains(tema)).OrderByDescending(o => o.DataEvento);

            return await query.ToArrayAsync();
        }

        public async Task<Palestrante[]> GetAllPalestranteAsyncByName(string nome, bool includeEventos = false)
        {
            IQueryable<Palestrante> query = _context.Palestrantes.Include(r => r.RedesSociais);

            if(includeEventos)
                query = query.Include(pe => pe.PalestrantesEventos).ThenInclude(e => e.Evento);

            query = query.Where(n => n.Nome.Contains(nome)).OrderBy(n => n.Nome);

            return await query.ToArrayAsync();
        }

        public async Task<Palestrante> GetPalestranteAsyncById(int palestranteId, bool includeEventos = false)
        {
            IQueryable<Palestrante> query = _context.Palestrantes.Include(r => r.RedesSociais);

            if(includeEventos)
                query = query.Include(pe => pe.PalestrantesEventos).ThenInclude(e => e.Evento);

            query = query.Where(p => p.Id == palestranteId);

            return await query.FirstOrDefaultAsync();
        }
    }
}