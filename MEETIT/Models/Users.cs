namespace meetit.Models
{
    public class Users
    {
        public int id { get; set; }
        public required string login { get; set; }
        public required string haslo { get; set; }
    }
}
