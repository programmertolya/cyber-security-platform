using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace CyberSecurity.Domain.Entities
{
    public class ContentBlock
    {
        public int Id { get; set; }
        public int TopicId { get; set; } // Внешний ключ
        public int OrderIndex { get; set; } // 1, 2, 3 (чтобы сортировать абзацы по порядку)
        public string Type { get; set; } = string.Empty; // "text" или "image"
        public string Value { get; set; } = string.Empty;// Сам текст абзаца или ссылка на картинку (/images/1.jpg)

        [JsonIgnore]
        public Topics? Topic { get; set; }
    }
}
