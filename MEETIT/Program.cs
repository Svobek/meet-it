using meetit.Models;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);


builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));


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

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseDefaultFiles();
app.UseRouting();

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



 app.Run();
