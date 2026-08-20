using System;
using System.Collections.Generic;
using System.Text;

namespace CyberSecurity.Domain.Entities
{
    public class Topics
    {
    public int Id { get; set; }
    public string Slug { get; set; } 
    public string Title { get; set; } 
    public string Description { get; set; } 
    
    public string GameRegistryKey { get; set; } 

        // Связь 1-ко-многим: У одной темы много блоков контента
    public List<ContentBlock> ContentBlocks { get; set; } = new();
    }
}
