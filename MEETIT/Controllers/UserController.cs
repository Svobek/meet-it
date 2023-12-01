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





        /*public IActionResult CreateUser()
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
        }*/

        public IActionResult AddUser([FromBody] Users users)
        {
            if (users == null)
            {
                return BadRequest("Invalid user data");
            }

            // Sprawdź, czy użytkownik o podanym e-mailu już istnieje
            if (_context.Users.Any(u => u.login == users.login))
            {
                return Conflict("User with this login already exists");
            }

            // Dodaj użytkownika do bazy danych
            _context.Users.Add(users);
            _context.SaveChanges();

            return Ok("User added successfully");
        }

    }
}
