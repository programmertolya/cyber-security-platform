using CyberSecurity.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace CyberSecurity.Application.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(User user);
    }
}
