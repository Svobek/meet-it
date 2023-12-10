using System.ComponentModel.DataAnnotations;

namespace meetit.Models
{
    public class Points
    {
        [Key]
        public int PointID { get; set; }
        public int TrackID { get; set; }
        public required string PointInTrackId { get; set; }
        public double xParm { get; set; }
        public double yParm { get; set; }
        public required string PointName { get; set; }
    }
}
