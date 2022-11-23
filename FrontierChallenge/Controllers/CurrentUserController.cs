using FrontierChallenge.Models;
using FrontierChallenge.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace FrontierChallenge.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CurrentUserController : ControllerBase
    {
        private readonly IJsonDataRepository _repository;

        public CurrentUserController(IJsonDataRepository repository)
        {
            _repository = repository;
        }

        // GET: api/<CurrentUserController>
        [HttpGet]
        public User Get()
        {
            return _repository.GetCurrentUser();
        }
        
    }
}
