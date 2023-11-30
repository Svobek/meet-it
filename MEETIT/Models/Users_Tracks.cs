using System.ComponentModel.DataAnnotations;

namespace meetit.Models
{
    public class Users_Tracks
    {
        public int idUsers { get; set; }
        public int idTracks { get; set; }
        public int isAdmin { get; set; }
    }
}
