using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProAgil.Domain;
using ProAgil.Repository;

namespace ProAgil.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventoController : ControllerBase
    {
        private readonly IProAgilRepository _repo;

        public EventoController(IProAgilRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var results = await _repo.GetAllEventoAsync(false);
                return Ok(results);
            }
            catch (System.Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,"Falha no Banco de Dados:" + e.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var results = await _repo.GetAllEventoAsyncById(id,true);
                return Ok(results);
            }
            catch (System.Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,"Falha no Banco de Dados");
            }
        }

        
        [HttpGet("getByTema/{tema}")]
        public async Task<IActionResult> Get(string tema)
        {
            try
            {
                var results = await _repo.GetAllEventoAsyncByTema(tema,true);
                return Ok(results);
            }
            catch (System.Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,"Falha no Banco de Dados");
            }
        }

        // POST api/values
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Evento model)
        {
            try
            {
                _repo.Add(model);
                if(await _repo.SaveChangesAsync())
                    return Ok(model);

                return BadRequest();
            }
            catch (System.Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,"Falha no Banco de Dados");
            }
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Evento model)
        {
            try
            {
                var evento = await _repo.GetAllEventoAsyncById(id);
                if(evento == null) return NotFound();

                _repo.Update(model);

                if(await _repo.SaveChangesAsync())
                    return Ok(model);

                return BadRequest();
            }
            catch (System.Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,"Falha no Banco de Dados");
            }
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
            var model = await _repo.GetAllEventoAsyncById(id);
                if(model == null) return NotFound();

                _repo.Delete(model);
                
                if(await _repo.SaveChangesAsync())
                    return Ok();

                return BadRequest();
            }
            catch (System.Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,"Falha no Banco de Dados");
            }
        }
    }
}
