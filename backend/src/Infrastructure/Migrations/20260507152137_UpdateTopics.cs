using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CyberSecurity.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UpdateTopics : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ContentBlock_Topic_TopicId",
                table: "ContentBlock");

            migrationBuilder.DropTable(
                name: "Topic");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ContentBlock",
                table: "ContentBlock");

            migrationBuilder.RenameTable(
                name: "ContentBlock",
                newName: "ContentBlocks");

            migrationBuilder.RenameIndex(
                name: "IX_ContentBlock_TopicId",
                table: "ContentBlocks",
                newName: "IX_ContentBlocks_TopicId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ContentBlocks",
                table: "ContentBlocks",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "Topics",
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
                    table.PrimaryKey("PK_Topics", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Topics",
                columns: new[] { "Id", "Description", "GameRegistryKey", "Slug", "Title" },
                values: new object[,]
                {
                    { 1, "Базовые термины ИБ", "crossword", "confidence", "Конфиденциальность" },
                    { 2, "Как придумать пароль, который не взломают", "passwordcreator", "passwords", "Надежные пароли" },
                    { 3, "Изучаем сетевые пакеты", "downloadtraffic", "traffic", "Анализ трафика" }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_ContentBlocks_Topics_TopicId",
                table: "ContentBlocks",
                column: "TopicId",
                principalTable: "Topics",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ContentBlocks_Topics_TopicId",
                table: "ContentBlocks");

            migrationBuilder.DropTable(
                name: "Topics");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ContentBlocks",
                table: "ContentBlocks");

            migrationBuilder.RenameTable(
                name: "ContentBlocks",
                newName: "ContentBlock");

            migrationBuilder.RenameIndex(
                name: "IX_ContentBlocks_TopicId",
                table: "ContentBlock",
                newName: "IX_ContentBlock_TopicId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ContentBlock",
                table: "ContentBlock",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "Topic",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Description = table.Column<string>(type: "text", nullable: false),
                    GameRegistryKey = table.Column<string>(type: "text", nullable: false),
                    Slug = table.Column<string>(type: "text", nullable: false),
                    Title = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Topic", x => x.Id);
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

            migrationBuilder.AddForeignKey(
                name: "FK_ContentBlock_Topic_TopicId",
                table: "ContentBlock",
                column: "TopicId",
                principalTable: "Topic",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
