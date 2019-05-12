using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ProAgil.Domain;
using ProAgil.Domain.Identity;

namespace ProAgil.Repository
{
    public class ProAgilContext : IdentityDbContext<User, Role, int, IdentityUserClaim<int>, UserRole, IdentityUserLogin<int>, IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public ProAgilContext(DbContextOptions<ProAgilContext> options) : base(options){}

        public DbSet<Evento> Eventos { get; set; }
        public DbSet<Palestrante> Palestrantes { get; set; }
        public DbSet<PalestranteEvento> PalestrantesEventos { get; set; }
        public DbSet<Lote> Lotes { get; set; }
        public DbSet<RedeSocial> RedesSociais { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder){
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<UserRole>().HasKey(ur => new {ur.UserId, ur.RoleId});
            modelBuilder.Entity<UserRole>().HasOne(ho => ho.Role).WithMany(wm => wm.UserRoles).
            HasForeignKey(hfk => hfk.RoleId).IsRequired();
            modelBuilder.Entity<UserRole>().HasOne(ho => ho.User).WithMany(wm => wm.UserRoles).
            HasForeignKey(hfk => hfk.UserId).IsRequired();

            modelBuilder.Entity<PalestranteEvento>().HasKey(pk => new { pk.EventoId, pk.PalestranteId });
        }
    }
}