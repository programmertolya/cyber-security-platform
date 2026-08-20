using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CyberSecurity.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class InitTopics : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Topic",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Slug = table.Column<string>(type: "text", nullable: false),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    GameRegistryKey = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Topic", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ContentBlock",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    TopicId = table.Column<int>(type: "integer", nullable: false),
                    OrderIndex = table.Column<int>(type: "integer", nullable: false),
                    Type = table.Column<string>(type: "text", nullable: false),
                    Value = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContentBlock", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ContentBlock_Topic_TopicId",
                        column: x => x.TopicId,
                        principalTable: "Topic",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Topic",
                columns: new[] { "Id", "Description", "GameRegistryKey", "Slug", "Title" },
                values: new object[,]
                {
                    { 1, "Базовые термины ИБ", "crossword", "confidence", "Конфиденциальность" },
                    { 2, "Как придумать пароль, который не взломают", "passwordcreator", "passwords", "Надежные пароли" },
                    { 3, "Изучаем сетевые пакеты", "downloadtraffic", "traffic", "Анализ трафика" }
                });

            migrationBuilder.InsertData(
                table: "ContentBlock",
                columns: new[] { "Id", "OrderIndex", "TopicId", "Type", "Value" },
                values: new object[,]
                {
                    { 1, 1, 1, "text", "(англ. confidence - доверие) — требование не передавать определенную информацию третьим лицам без согласия её обладателя" },
                    { 2, 2, 1, "image", "images/topics/confidence-page.png" },
                    { 3, 1, 2, "text", "Пароль должен состоять минимум из 12 символов, содержать цифры и спецсимволы." },
                    { 4, 2, 2, "text", "Давайте попробуем создать безопасный пароль в симуляторе ниже!" },
                    { 5, 1, 3, "text", "Любые данные в сети разбиваются на пакеты." }
                });

            migrationBuilder.CreateIndex(
                name: "IX_ContentBlock_TopicId",
                table: "ContentBlock",
                column: "TopicId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ContentBlock");

            migrationBuilder.DropTable(
                name: "Topic");
        }
    }
}
