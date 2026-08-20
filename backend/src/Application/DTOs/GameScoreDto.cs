using System;
using System.Collections.Generic;
using System.Text;

namespace CyberSecurity.Application.DTOs
{
    public record GameScoreDto(
        string GameName,
        int Score,
        DateTime CreatedAt
    );
}
