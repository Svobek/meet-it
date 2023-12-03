using meetit.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using BCrypt.Net;


namespace meetit.Controllers
{
    public class UserController : Controller
    {
        private readonly AppDbContext _context;

        public UserController(AppDbContext context)
        {
            _context = context;
        }

        

        public IActionResult AddUser([FromBody] Users users)
        {
            
            //get last user id from database use order by
            var lastId = _context.Users.OrderByDescending(u => u.id).FirstOrDefault().id;
            users.id = lastId + 1;
            //hash password
            users.psswd = BCrypt.Net.BCrypt.HashPassword(users.psswd);

            if (users == null)
            {
                return BadRequest("Invalid user data");
            }

            // Sprawdź, czy użytkownik o podanym loginie już istnieje
            if (_context.Users.Any(u => u.login == users.login))
            {
                return Conflict("User with this login already exists");
            }

            _context.Users.Add(users);
            _context.SaveChanges();

            return Ok("User added successfully");
        }

        
        /*public IActionResult GetUserById(int id)
        {
            var user = _context.Users.FirstOrDefault(u => u.id == id);
            return Ok(user);
        }*/


        public IActionResult UpdateU([FromBody] Users users)
        {
            var user = _context.Users.FirstOrDefault(u => u.login == users.login);
            user.psswd = users.psswd;
            _context.SaveChanges();
            return Ok("Password updated successfully");
        }

        //write method to login user
        public IActionResult Login([FromBody] Users users)
        {
            var user = _context.Users.FirstOrDefault(u => u.login == users.login);
            if (user == null)
            {
                return BadRequest("Invalid login or password");
            }
            if (BCrypt.Net.BCrypt.Verify(users.psswd, user.psswd))
            {
                return Ok("Succesfull Login");
            }
            else
            {
                return BadRequest("Invalid login or password");
            }
        }
        //write method to print all users on website
        public IActionResult GetAllUsers()
        {
            var users = _context.Users.ToList();
            return Ok(users);
        }
        


       
    }
}
