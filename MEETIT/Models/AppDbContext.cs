using Microsoft.EntityFrameworkCore;

namespace meetit.Models
{
    

    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Points> Points { get; set; }
        public DbSet<Track> Track { get; set; }
        public DbSet<Users> Users { get; set; }
        public DbSet<Users_Tracks> Users_Tracks { get; set; }
        public DbSet<PointValues> PointValues { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Users_Tracks>()
                .HasKey(ut => new { ut.idUsers, ut.idTracks });
        }

    }

    
    
    

}
