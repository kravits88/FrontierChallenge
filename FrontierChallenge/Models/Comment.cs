namespace FrontierChallenge.Models
{
    public class Comment
    {
        public int Id { get; set; }
        public string? Content { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public int Score { get; set; }
        public User? User { get; set; }
        public List<Comment> Replies { get; set; } = new List<Comment>();
        public string? ReplyingTo { get; set; }
        public int? ReplyingToId { get; set; }
    }
}
