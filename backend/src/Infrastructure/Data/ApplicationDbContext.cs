using System;
using System.Collections.Generic;
using System.Text;
using CyberSecurity.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using CyberSecurity.Application.Interfaces;

namespace CyberSecurity.Infrastructure.Data
{
    public class ApplicationDbContext : DbContext, IApplicationDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
        public DbSet<User> Users => Set<User>();
        public DbSet<GameScore> GameScores => Set<GameScore>();
        public DbSet<Topics> Topics {get; set;}
        public DbSet<ContentBlock> ContentBlocks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // конфигурация User
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => e.Email).IsUnique();
                entity.Property(e => e.Email).IsRequired().HasMaxLength(255);
                entity.Property(e => e.Username).IsRequired().HasMaxLength(100);
            });

            // конфигурация рекордов
            modelBuilder.Entity<GameScore>(entity =>
            {
                entity.HasKey(e => e.Id);

                // связь один ко многим
                entity.HasOne(d => d.User)
                .WithMany(p => p.GameScores)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.Cascade); // при удалении user удаляем все его рекоды 
            });

            modelBuilder.Entity<Topics>().HasData(
                new Topics { Id = 1, Slug = "confidence", Title = "Конфиденциальность", Description = "(англ. confidence - доверие) — требование не передавать определенную информацию третьим лицам без согласия её обладателя", GameRegistryKey = "crossword" },
                new Topics { Id = 2, Slug = "password", Title = "Пароль", Description = "(фр. parole - слово) - это секретное слово или набор символов, предназначенный для подтверждения личности или полномочий. Пароли используются для защиты информации от несанкционированного доступа.", GameRegistryKey = "passwordcreator" },
                new Topics { Id = 3, Slug = "traffic", Title = "Трафик", Description = "(англ. traffic - движение, грузооборот) — объем информации, передаваемой через компьютерную сеть за определенный период времени.", GameRegistryKey = "downloadtraffic" },
                new Topics { Id = 4, Slug = "internet", Title = "Интернет", Description = "(aнгл. internet - межсетевой) - средство для получения доступа к библиотекам, играм, аудио и видео-файлам и обмена информацией между людьми, находящимися на разных частях планеты.", GameRegistryKey = "connectiontypes" },
                new Topics { Id = 5, Slug = "site", Title = "Сайт", Description = "(от англ. website: web — «паутина, сеть» и site — «место») — система электронных документов, объединенных единой темой, автором или формой под общим адресом (доменным именем)", GameRegistryKey = "buildadomain" },
                new Topics { Id = 6, Slug = "hamming", Title = "Расстояние Хэмминга", Description = "это метрика, определяющая количество позиций, в которых соответствующие символы двух строк (или векторов) одинаковой длины различаются. ", GameRegistryKey = "hammingdistance" }
                );

            modelBuilder.Entity<ContentBlock>().HasData(
            // Контент для Конфиденциальности (TopicId = 1)
            new ContentBlock { Id = 1, TopicId = 1, OrderIndex = 1, Type = "text", Value = "в 2014 году произошла глобальная утечка конфиденциальных данных в Китае - в сеть были выложены более 140 тысяч паспортных данных!" },
            new ContentBlock { Id = 2, TopicId = 1, OrderIndex = 2, Type = "image", Value = "/images/topics/confidence-page.png" }, // Картинка из интернета для примера

            // Контент для Паролей (TopicId = 2)
            new ContentBlock { Id = 3, TopicId = 2, OrderIndex = 1, Type = "text", Value = "Тройка самых популярных в мире паролей выглядит так: \"123456\", \"123456789\", \"12345678\", 4, 5 и 6 места занимают \"12345\", \"password\" и \"qwerty\" " },
            new ContentBlock { Id = 4, TopicId = 2, OrderIndex = 2, Type = "image", Value = "/images/topics/password1.png" },
            new ContentBlock { Id = 5, TopicId = 2, OrderIndex = 3, Type = "image", Value = "/images/topics/password2.png" },
            new ContentBlock { Id = 6, TopicId = 2, OrderIndex = 4, Type = "image", Value = "/images/topics/password3.png" },

            // Контент для Трафика (TopicId = 3)
            new ContentBlock { Id = 7, TopicId = 3, OrderIndex = 1, Type = "text", Value = "Ежегодно интернет-трафик растет на 314000%, когда как большинство его генерируется не людьми, а ботами вредоносных программ и поисковыми роботами" },
            new ContentBlock { Id = 8, TopicId = 3, OrderIndex = 2, Type = "image", Value = "/images/topics/traffic-page1.png" },
            new ContentBlock { Id = 9, TopicId = 3, OrderIndex = 3, Type = "image", Value = "/images/topics/traffic-page2.png" },
            new ContentBlock { Id = 10, TopicId = 3, OrderIndex = 4, Type = "image", Value = "/images/topics/traffic-page3.png" },

            // Контент для Интернета (TopicId = 4)
            new ContentBlock { Id = 11, TopicId = 4, OrderIndex = 1, Type = "text", Value = "По данным на начало 2026 года, Google обрабатывает более 5,9 триллионов поисковых запросов в год." },
            new ContentBlock { Id = 12, TopicId = 4, OrderIndex = 2, Type = "image", Value = "/images/topics/internet1.png" },
            new ContentBlock { Id = 13, TopicId = 4, OrderIndex = 3, Type = "image", Value = "/images/topics/internet2.png" },
            new ContentBlock { Id = 14, TopicId = 4, OrderIndex = 4, Type = "image", Value = "/images/topics/internet3.png" },
            new ContentBlock { Id = 15, TopicId = 4, OrderIndex = 5, Type = "image", Value = "/images/topics/internet4.png" },
            new ContentBlock { Id = 16, TopicId = 4, OrderIndex = 6, Type = "image", Value = "/images/topics/internet5.png" },

            // Контент для Сайтов (TopicId = 5)
            new ContentBlock { Id = 17, TopicId = 5, OrderIndex = 1, Type = "text", Value = "В настоящее время зарегистрировано 227 млн. сайтов, которые содержат более 65 млрд. веб-страниц" },
            new ContentBlock { Id = 18, TopicId = 5, OrderIndex = 2, Type = "image", Value = "/images/topics/site-page1.jpg" },
            new ContentBlock { Id = 19, TopicId = 5, OrderIndex = 3, Type = "image", Value = "/images/topics/site-page2.jpg" },

            // Контент для Расстояние Хэмминга(TopicId = 6)
            new ContentBlock { Id = 20, TopicId = 6, OrderIndex = 1, Type = "text", Value = "Расстояние Хэмминга измеряет количество позиций, в которых различаются два битовых набора одинаковой длины. Именно на этом принципе основаны коды Хэмминга, позволяющие технике (жестким дискам, оперативной памяти) находить и исправлять ошибки при передаче или хранении данных." },
            new ContentBlock { Id = 21, TopicId = 6, OrderIndex = 2, Type = "image", Value = "/images/topics/hamming_dist1.png" }
            );
        }
    }
}
