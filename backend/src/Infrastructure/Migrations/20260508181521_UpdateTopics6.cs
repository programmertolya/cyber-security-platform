using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CyberSecurity.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UpdateTopics6 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Topics",
                columns: new[] { "Id", "Description", "GameRegistryKey", "Slug", "Title" },
                values: new object[] { 6, "это метрика, определяющая количество позиций, в которых соответствующие символы двух строк (или векторов) одинаковой длины различаются. ", "hammingdistance", "hamming", "Расстояние Хэмминга" });

            migrationBuilder.InsertData(
                table: "ContentBlocks",
                columns: new[] { "Id", "OrderIndex", "TopicId", "Type", "Value" },
                values: new object[,]
                {
                    { 20, 1, 6, "text", "Расстояние Хэмминга измеряет количество позиций, в которых различаются два битовых набора одинаковой длины. Именно на этом принципе основаны коды Хэмминга, позволяющие технике (жестким дискам, оперативной памяти) находить и исправлять ошибки при передаче или хранении данных." },
                    { 21, 2, 6, "image", "/images/topics/hamming_dist1.png" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "ContentBlocks",
                keyColumn: "Id",
                keyValue: 20);

            migrationBuilder.DeleteData(
                table: "ContentBlocks",
                keyColumn: "Id",
                keyValue: 21);

            migrationBuilder.DeleteData(
                table: "Topics",
                keyColumn: "Id",
                keyValue: 6);
        }
    }
}
