using FrontierChallenge.Models;
using FrontierChallenge.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace FrontierChallenge.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly IJsonDataRepository _repository;

        public CommentController(IJsonDataRepository repository)
        {
            _repository = repository;
        }

        // GET: api/<CommentController>
        [HttpGet]
        public List<Comment> Get()
        {
            return _repository.GetComments();
        }


        // POST api/<CommentController>
        [HttpPost]
        public void Post(Comment comment)
        {
            if (comment.Id == 0)
            {
                comment.User = _repository.GetCurrentUser();
                comment.CreatedAt = DateTimeOffset.UtcNow;
            }

            _repository.Commit(comment);
        }


        // DELETE api/<CommentController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _repository.DeleteComment(id);
        }
    }
}
