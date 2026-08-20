using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CyberSecurity.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UpdateTopics3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "ContentBlocks",
                keyColumn: "Id",
                keyValue: 1,
                column: "Value",
                value: "в 2014 году произошла глобальная утечка конфиденциальных данных в Китае - в сеть были выложены более 140 тысяч паспортных данных!");

            migrationBuilder.UpdateData(
                table: "ContentBlocks",
                keyColumn: "Id",
                keyValue: 3,
                column: "Value",
                value: "Тройка самых популярных в мире паролей выглядит так: \"123456\", \"123456789\", \"12345678\", 4, 5 и 6 места занимают \"12345\", \"password\" и \"qwerty\" ");

            migrationBuilder.UpdateData(
                table: "ContentBlocks",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "Type", "Value" },
                values: new object[] { "/images/topics/password1.png", "" });

            migrationBuilder.UpdateData(
                table: "ContentBlocks",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "OrderIndex", "TopicId", "Type", "Value" },
                values: new object[] { 3, 2, "/images/topics/password2.png", "" });

            migrationBuilder.InsertData(
                table: "ContentBlocks",
                columns: new[] { "Id", "OrderIndex", "TopicId", "Type", "Value" },
                values: new object[,]
                {
                    { 6, 4, 2, "/images/topics/password3.png", "" },
                    { 7, 1, 3, "text", "Ежегодно интернет-трафик растет на 314000%, когда как большинство его генерируется не людьми, а ботами вредоносных программ и поисковыми роботами" },
                    { 8, 2, 3, "image", "/images/topics/traffic-page1.png" },
                    { 9, 3, 3, "image", "/images/topics/traffic-page2.png" },
                    { 10, 4, 3, "image", "/images/topics/traffic-page3.png" }
                });

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 1,
                column: "Description",
                value: "(англ. confidence - доверие) — требование не передавать определенную информацию третьим лицам без согласия её обладателя");

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Description", "Slug", "Title" },
                values: new object[] { "(фр. parole - слово) - это секретное слово или набор символов, предназначенный для подтверждения личности или полномочий. Пароли используются для защиты информации от несанкционированного доступа.", "password", "Пароль" });

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Description", "Title" },
                values: new object[] { "(англ. traffic - движение, грузооборот) — объем информации, передаваемой через компьютерную сеть за определенный период времени.", "Трафик" });

            migrationBuilder.InsertData(
                table: "Topics",
                columns: new[] { "Id", "Description", "GameRegistryKey", "Slug", "Title" },
                values: new object[,]
                {
                    { 4, "(aнгл. internet - межсетевой) - средство для получения доступа к библиотекам, играм, аудио и видео-файлам и обмена информацией между людьми, находящимися на разных частях планеты.", "connectiontypes", "internet", "Интернет" },
                    { 5, "(от англ. website: web — «паутина, сеть» и site — «место») — система электронных документов, объединенных единой темой, автором или формой под общим адресом (доменным именем)", "buildadomain", "site", "Сайт" }
                });

            migrationBuilder.InsertData(
                table: "ContentBlocks",
                columns: new[] { "Id", "OrderIndex", "TopicId", "Type", "Value" },
                values: new object[,]
                {
                    { 11, 1, 4, "text", "По данным на начало 2026 года, Google обрабатывает более 5,9 триллионов поисковых запросов в год." },
                    { 12, 2, 4, "image", "/images/topics/internet1.png" },
                    { 13, 3, 4, "image", "/images/topics/internet2.png" },
                    { 14, 4, 4, "image", "/images/topics/internet3.png" },
                    { 15, 5, 4, "image", "/images/topics/internet4.png" },
                    { 16, 6, 4, "image", "/images/topics/internet5.png" },
                    { 17, 1, 5, "text", "В настоящее время зарегистрировано 227 млн. сайтов, которые содержат более 65 млрд. веб-страниц" },
                    { 18, 2, 5, "image", "/images/topics/site-page1.png" },
                    { 19, 3, 5, "image", "/images/topics/site-page2.png" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "ContentBlocks",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "ContentBlocks",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "ContentBlocks",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "ContentBlocks",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "ContentBlocks",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "ContentBlocks",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "ContentBlocks",
                keyColumn: "Id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "ContentBlocks",
                keyColumn: "Id",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "ContentBlocks",
                keyColumn: "Id",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "ContentBlocks",
                keyColumn: "Id",
                keyValue: 15);

            migrationBuilder.DeleteData(
                table: "ContentBlocks",
                keyColumn: "Id",
                keyValue: 16);

            migrationBuilder.DeleteData(
                table: "ContentBlocks",
                keyColumn: "Id",
                keyValue: 17);

            migrationBuilder.DeleteData(
                table: "ContentBlocks",
                keyColumn: "Id",
                keyValue: 18);

            migrationBuilder.DeleteData(
                table: "ContentBlocks",
                keyColumn: "Id",
                keyValue: 19);

            migrationBuilder.DeleteData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.UpdateData(
                table: "ContentBlocks",
                keyColumn: "Id",
                keyValue: 1,
                column: "Value",
                value: "(англ. confidence - доверие) — требование не передавать определенную информацию третьим лицам без согласия её обладателя");

            migrationBuilder.UpdateData(
                table: "ContentBlocks",
                keyColumn: "Id",
                keyValue: 3,
                column: "Value",
                value: "Пароль должен состоять минимум из 12 символов, содержать цифры и спецсимволы.");

            migrationBuilder.UpdateData(
                table: "ContentBlocks",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "Type", "Value" },
                values: new object[] { "text", "Давайте попробуем создать безопасный пароль в симуляторе ниже!" });

            migrationBuilder.UpdateData(
                table: "ContentBlocks",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "OrderIndex", "TopicId", "Type", "Value" },
                values: new object[] { 1, 3, "text", "Любые данные в сети разбиваются на пакеты." });

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 1,
                column: "Description",
                value: "Базовые термины ИБ");

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Description", "Slug", "Title" },
                values: new object[] { "Как придумать пароль, который не взломают", "passwords", "Надежные пароли" });

            migrationBuilder.UpdateData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Description", "Title" },
                values: new object[] { "Изучаем сетевые пакеты", "Анализ трафика" });
        }
    }
}
