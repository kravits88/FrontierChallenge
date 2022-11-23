namespace FrontierChallenge.Models
{
    public class JsonData
    {
        public User? CurrentUser { get; set; }
        public List<Comment> Comments { get; set; } = new List<Comment>();
    }
}
