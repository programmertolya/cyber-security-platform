using CyberSecurity.Application.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CyberSecurity.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AiController : ControllerBase
    {
        private readonly AiService _aiService;

        public AiController(AiService aiService)
        {
            _aiService = aiService;
        }

        [HttpPost("hint")]
        public async Task GetHintStream([FromBody] string prompt, CancellationToken cancellationToken)
        {
            Response.ContentType = "text/event-stream";
            await foreach(var chunk in _aiService.GetHintStreamAsync(prompt, cancellationToken))
            {
                await Response.WriteAsync($"data: {chunk}\n\n");
                await Response.Body.FlushAsync();
            }
        }
    }
}
