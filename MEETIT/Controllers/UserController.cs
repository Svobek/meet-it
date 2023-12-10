using meetit.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using BCrypt.Net;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Authorization;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.VisualBasic;
using System.CodeDom.Compiler;


namespace meetit.Controllers
{
    
    public class UserController : Controller
    {
        private readonly AppDbContext _context;

        public UserController(AppDbContext context)
        {
            _context = context;
        }

        
        [HttpPost]
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
        [HttpPost]
        public IActionResult Login([FromBody] Users users)
        {
            var user = _context.Users.FirstOrDefault(u => u.login == users.login);
           
            if (user == null)
            {
                return BadRequest("Invalid login or password");
            }
            if (BCrypt.Net.BCrypt.Verify(users.psswd, user.psswd))
            {
                var Token = GenerateToken(user.login);
                //return token and user id
                return Ok(Token;


                
                
                
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

        

        
        private string GenerateToken(string username)
        {
            
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("00112233445566778899AABBCCDDEEFF"); // Klucz używany do podpisywania tokena

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                new Claim(ClaimTypes.Name, username),
                // Dodaj inne roszczenia (claims) w zależności od potrzeb
            }),
                Expires = DateTime.UtcNow.AddHours(1), // Czas ważności tokena
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        //write method to validate token
        private bool ValidateToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("00112233445566778899AABBCCDDEEFF"); // Klucz używany do weryfikacji tokena

            try
            {
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    IssuerSigningKey = new SymmetricSecurityKey(key), // Klucz używany do podpisywania tokena
                    ValidateIssuerSigningKey = true,
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true
                }, out SecurityToken validatedToken);
            }
            catch
            {
                return false;
            }

            return true;
        }

        //write endpoint to check if token is valid
        [HttpGet]
        public IActionResult CheckToken(string token)
        {
            if (string.IsNullOrWhiteSpace(token))
            {
                return BadRequest("Token is empty");
            }
            if (ValidateToken(token))
            {
                return Ok("Token is valid");
            }
            else
            {
                return BadRequest("Token is invalid");
            }
        }
        
        

        //connect user and track in Users_Tracks table
        public IActionResult ConnectUserAndTrack([FromBody] Users_Tracks users_Tracks)
        {
            

            if (users_Tracks == null)
            {
                return BadRequest("Invalid data");
            }
            _context.Users_Tracks.Add(users_Tracks);
            _context.SaveChanges();

            return Ok("User and track connected successfully");
        }
        //get user id by login
        public IActionResult GetUserByLogin(string login)
        {
            var user = _context.Users.FirstOrDefault(u => u.login == login);
            if (user == null)
            {
                return BadRequest("Invalid login");
            }

            return Ok(user.id);
        }

        












    }
}
