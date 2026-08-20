using System;
using System.Collections.Generic;
using System.Text;
using BCrypt.Net;
using CyberSecurity.Application.DTOs;
using CyberSecurity.Application.Interfaces;
using CyberSecurity.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CyberSecurity.Application.Services
{
    public class UserService : IUserService
    {
        private readonly IApplicationDbContext _context;
        private readonly ITokenService _tokenService;
        public UserService(IApplicationDbContext context, ITokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        public async Task<Guid> RegisterAsync(UserRegistrationDto dto)
        {
            var exists = await _context.Users.AnyAsync(u => u.Email == dto.Email);
            if (exists) throw new Exception("User already exists");
            string passwordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);
            var user = new User
            {
                Email = dto.Email,
                Username = dto.Username,
                PasswordHash = passwordHash,
                Role = UserRole.User
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return user.Id;
        }

        public async Task<string> LoginAsync(string email, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
            {
                throw new Exception("Неверный email или пароль");
            }

            // вызываем генерацию JWT токена
            return _tokenService.CreateToken(user);
        }
    }
}
