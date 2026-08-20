using System;
using System.Collections.Generic;
using System.Text;

namespace CyberSecurity.Domain.Entities
{
    public class GameScore
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public Guid UserId { get; set; }
        public virtual User User { get; set; } = null!;
        public string GameName { get; set; } = string.Empty;
        public int Score { get; set; }
        public DateTime AchivedAt { get; set; } = DateTime.UtcNow;
    }
}
