using CyberSecurity.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CyberSecurity.Application.Interfaces;

public interface IApplicationDbContext
{
    DbSet<User> Users { get; }
    DbSet<GameScore> GameScores { get; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}