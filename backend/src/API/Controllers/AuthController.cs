using CyberSecurity.Application.DTOs;
using CyberSecurity.Application.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CyberSecurity.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;
        public AuthController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegistrationDto dto)
        {
            try
            {
                var userId = await _userService.RegisterAsync(dto);
                return Ok(new {UserId = userId, Message = "Registration successful"});
            }
            catch (Exception ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginDto dto)
        {
            try
            {
                var token = await _userService.LoginAsync(dto.Email, dto.Password);

                return Ok(new
                {
                    Token = token,
                    Message = "Login successful"
                });
            }
            catch (Exception ex)
            {
                return Unauthorized(new { Message = ex.Message });
            }
        }

    }
}
