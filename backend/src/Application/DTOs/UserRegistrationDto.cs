using System;
using System.Collections.Generic;
using System.Text;

namespace CyberSecurity.Application.DTOs
{
    public record UserRegistrationDto(
        string Email,
        string Username,
        string Password
    );
}
