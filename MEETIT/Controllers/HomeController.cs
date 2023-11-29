using meetit.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace meetit.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            if (id == 1)
            {
                return "Hello";
            }
            else
            {
                return "World";
            }
            
        }


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }


        

        
      
    }
}
