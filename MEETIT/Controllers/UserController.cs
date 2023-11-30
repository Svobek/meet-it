using meetit.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;


namespace meetit.Controllers
{
    public class UserController : Controller
    {
        private readonly AppDbContext _context;

        public UserController(AppDbContext context)
        {
            _context = context;
        }

        
        public IActionResult Index()
        {
            // Akcja, która zwraca widok z listą postów
            var Users = _context.Users.ToList();
            return View(Users);
        }

        
        public IActionResult CreateUser()
        {
            var user = new Users
            {
                id = 1,
                login = "Jan",
                psswd = "Kowalski123",
            };

            _context.Users.Add(user);
            _context.SaveChanges();
            return RedirectToAction("Index");
        }

    }
}
