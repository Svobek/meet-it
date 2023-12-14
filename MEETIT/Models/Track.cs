using System.ComponentModel.DataAnnotations;

namespace meetit.Models
{
    public class Track
    {
        [Key]
        public int idTrack { get; set; }   
        public required string Name { get; set; }
        public required string descriptions { get; set; }
    }
}
