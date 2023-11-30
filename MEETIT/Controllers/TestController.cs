using Microsoft.AspNetCore.Mvc;

namespace meetit.Controllers
{
    public class TestController : Controller
    {

        public IActionResult Index()
        {
            return new ContentResult
            {
                Content = "Hello World",
                ContentType = "text/plain",
                StatusCode = 200
            };
        }

        public IActionResult Json()
        {
            return new JsonResult(new { name = "John", age = 30 });
        }
        
        
        
    }
}
