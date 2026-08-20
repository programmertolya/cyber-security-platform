using System;
using System.Collections.Generic;
using System.Text;
using CyberSecurity.Application.DTOs;

namespace CyberSecurity.Application.Interfaces
{
    public interface IUserService
    {
        Task<Guid> RegisterAsync(UserRegistrationDto dto);

        Task<string> LoginAsync(string email, string password);
    }
}
