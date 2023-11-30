using System.ComponentModel.DataAnnotations;

namespace meetit.Models
{
    public class Users
    {
        [Key]
        public int id { get; set; }
        public required string login { get; set; }
        public required string psswd { get; set; }
    }
}
