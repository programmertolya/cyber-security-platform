using System;
using System.Collections.Generic;
using System.Text;

namespace CyberSecurity.Domain.Entities
{
    public class User
    {
        public Guid Id { get; set; }
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set;} = string.Empty;
        public string Username { get; set; } = string.Empty;
        public UserRole Role { get; set; } = UserRole.User;
        public virtual ICollection<GameScore> GameScores { get; set; } = new List<GameScore>(); 
    }

    public enum UserRole
    {
        User,
        Admin
    }
}
