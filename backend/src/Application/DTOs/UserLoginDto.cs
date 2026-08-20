using System;
using System.Collections.Generic;
using System.Text;

namespace CyberSecurity.Application.DTOs
{
    public record UserLoginDto(
        string Email,
        string Password
    );
}
