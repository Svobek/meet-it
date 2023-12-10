using meetit.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);


builder.Services.AddCors(options =>
{
    options.AddPolicy(MyAllowSpecificOrigins,
                             policy =>
                             {
                          policy.WithOrigins("https://meeetit.azurewebsites.net")
                                .AllowAnyHeader()
                                .AllowAnyMethod();
                      });
});

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes("00112233445566778899AABBCCDDEEFF"))
    };
});
// Add services to the container.
builder.Services.AddControllers();

var app = builder.Build();



// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}


app.UseCors(MyAllowSpecificOrigins);
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseDefaultFiles();
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();


app.UseFileServer(enableDirectoryBrowsing: true);

app.MapControllerRoute(
    name: "test",
    pattern: "{controller=Test}/{action=Index}/{id?}");

app.MapControllerRoute(
    name: "test1",
    pattern: "{controller=Test}/{action=Json}/{id?}");


app.MapControllerRoute(
    name: "AddUser",
    pattern: "{controller=User}/{action=AddUser}/");


app.MapControllerRoute(
    name: "GetUserById",
    pattern: "{controller=User}/{action=GetUserById}/{id?}");

app.MapControllerRoute(
    name: "UpdatePassword",
    pattern: "{controller=User}/{action=UpdateU}/");

app.MapControllerRoute(
    name: "Login",
    pattern: "{controller=User}/{action=Login}/");

app.MapControllerRoute(
    name: "GetAllUsers",
    pattern: "{controller=User}/{action=GetAllUsers}/");

app.MapControllerRoute(
    name: "Token",
    pattern: "{controller=User}/{action=CheckToken}/{token?}");

app.MapControllerRoute(
    name: "AddTrack",
    pattern: "{controller=Track}/{action=AddTrack}/");

app.MapControllerRoute(
    name: "AddPoint",
    pattern: "{controller=Point}/{action=AddPoint}/{name?}");

app.MapControllerRoute(
    name: "AddPointValues",
    pattern: "{controller=Point}/{action=AddPointValues}/{name?}");

app.MapControllerRoute(
    name: "User_Track",
       pattern: "{controller=User}/{action=ConnectUserAndTrack}/{name?}");

app.MapControllerRoute(
    name: "User_Track",
       pattern: "{controller=User}/{action=GetUserByLogin}/{name?}");







app.Run();
