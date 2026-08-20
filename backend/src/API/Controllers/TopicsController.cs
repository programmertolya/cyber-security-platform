using CyberSecurity.Infrastructure.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CyberSecurity.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TopicsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TopicsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllTopics()
        {
            var topics = await _context.Topics.OrderBy(x => x.Id).ToListAsync();
            return Ok(topics);
        }
        [HttpGet("{slug}")]
        public async Task<IActionResult> GetTopicBySlug(string slug)
        {

            var topic = await _context.Topics
                .Include(t => t.ContentBlocks)
                .FirstOrDefaultAsync(t => t.Slug == slug);

            if (topic == null)
            {
                return NotFound(new { message = $"Тема со slug '{slug}' не найдена." });
            }

            if (topic.ContentBlocks != null && topic.ContentBlocks.Any())
            {
                topic.ContentBlocks = topic.ContentBlocks.OrderBy(c => c.OrderIndex).ToList();
            }

            return Ok(topic);
        }
    }
}
