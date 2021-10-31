#nullable disable
using Microsoft.EntityFrameworkCore;
using risk9.Models;

namespace risk9.Data {
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options): base(options)
        {
        }

        public DbSet<Asset> Assets { get; set; }
    }
}