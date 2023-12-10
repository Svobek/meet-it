using System.ComponentModel.DataAnnotations;

namespace meetit.Models
{
    public class PointValues
    {
        [Key]
        public int idPointValues { get; set; }

        public int idPoint { get; set; }
        public double Price { get; set; }
        public DateOnly date { get; set; }
        public TimeOnly time { get; set; }
    }
}
