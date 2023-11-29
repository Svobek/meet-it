namespace meetit.Models
{
    public class Points
    {
        public int PointID { get; set; }
        public int TrackID { get; set; }
        public required string PointInTrackID { get; set; }
        public float xParm { get; set; }
        public float yParm { get; set; }
        public required string PointName { get; set; }
    }
}
