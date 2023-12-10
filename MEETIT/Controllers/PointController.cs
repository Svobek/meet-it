using meetit.Models;
using Microsoft.AspNetCore.Mvc;

namespace meetit.Controllers
{
    public class PointController : Controller
    {
        private readonly AppDbContext _context;

        public PointController(AppDbContext context)
        {
            _context = context;
        }

        // make endpoint to add point
        public IActionResult AddPoint([FromBody] Points point)
        {
            
            if (point == null)
            {
                return BadRequest("Invalid point data");
            }
            var lastId = _context.Points.OrderByDescending(u => u.PointID).FirstOrDefault().PointID;
            point.PointID = lastId + 1;
            _context.Points.Add(point);
            _context.SaveChanges();

            return Ok("Point added successfully");
        }

        //make endpoint to get all points by track id
        public IActionResult GetPointsByTrackId(int id)
        {
            var points = _context.Points.Where(u => u.TrackID == id);
            if (points == null)
            {
                return BadRequest("Invalid track id");
            }

            return Ok(points);
        }
        
        //make endpoint to add point values 
        public IActionResult AddPointValues([FromBody] PointValues pointvalue)
        {
            var lastId = _context.PointValues.OrderByDescending(u => u.idPointValues).FirstOrDefault().idPointValues;
            pointvalue.idPointValues = lastId + 1;
            if (pointvalue == null)
            {
                return BadRequest("Invalid point data");
            }

            _context.PointValues.Add(pointvalue);
            _context.SaveChanges();

            return Ok("Point added successfully");
        }

       
        
    }
}
