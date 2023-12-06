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
            var lastId = _context.Points.OrderByDescending(u => u.PointID).FirstOrDefault().PointID;
            point.PointID = lastId + 1;
            if (point == null)
            {
                return BadRequest("Invalid point data");
            }

            _context.Points.Add(point);
            _context.SaveChanges();

            return Ok("Point added successfully");
        }
        
        

    }
}
