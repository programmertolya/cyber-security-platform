using CyberSecurity.Application.DTOs;
using CyberSecurity.Domain.Entities;
using CyberSecurity.Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace CyberSecurity.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GamesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public GamesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("score")]
        [Authorize]
        public async Task<IActionResult> SaveScore([FromBody] GameScoreDto dto)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null) return Unauthorized();

            var userId = Guid.Parse(userIdClaim.Value);

            var existingScore = await _context.GameScores
                .FirstOrDefaultAsync(s => s.UserId == userId && s.GameName == dto.GameName);

            if (existingScore == null)
            {
                var scoreEntry = new GameScore
                {
                    UserId = userId,
                    GameName = dto.GameName,
                    Score = dto.Score,
                    AchivedAt = DateTime.UtcNow 
                };
                _context.GameScores.Add(scoreEntry);
            }
            else
            {
                if (dto.Score > existingScore.Score)
                {
                    existingScore.Score = dto.Score;
                    existingScore.AchivedAt = DateTime.UtcNow;
                }
                else
                {
                    return Ok(new { message = "Score not updated (not a high score)." });
                }
            }

            await _context.SaveChangesAsync();
            return Ok(new { message = "High score saved successfully!" });
        }

        [HttpGet("leaderboard/{gameName}")]
        public async Task<IActionResult> GetLeaderBoard(string gameName)
        {
            var scores = await _context.GameScores
                .Where(s => s.GameName == gameName)
                .OrderByDescending(s => s.Score)
                .Take(10)
                .Select(s => new
                {
                    Username = s.User.Username,
                    Score = s.Score,
                    Date = s.AchivedAt
                }).ToListAsync();

            return Ok(scores);
        }
    }
}
