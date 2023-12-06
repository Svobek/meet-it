using meetit.Models;
using Microsoft.AspNetCore.Mvc;

namespace meetit.Controllers
{
    public class TrackController : Controller
    {
        private readonly AppDbContext _context;

        public TrackController(AppDbContext context)
        {
            _context = context;
        }

        // add track
        public IActionResult AddTrack([FromBody] Track track)
        {
            var lastId = _context.Track.OrderByDescending(u => u.idTrack).FirstOrDefault().idTrack;
            track.idTrack = lastId + 1;
            if (track == null)
            {
                return BadRequest("Invalid track data");
            }

            _context.Track.Add(track);
            _context.SaveChanges();

            return Ok("Track added successfully");
        }
       

        // get track by id
        public IActionResult GetTrackById(int id)
        {
            var track = _context.Track.FirstOrDefault(u => u.idTrack == id);
            return Ok(track);
        }

        


    }
}
