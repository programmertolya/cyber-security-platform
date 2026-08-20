using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CyberSecurity.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UpdateTopics5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "ContentBlocks",
                keyColumn: "Id",
                keyValue: 4,
                columns: new[] { "Type", "Value" },
                values: new object[] { "image", "/images/topics/password1.png" });

            migrationBuilder.UpdateData(
                table: "ContentBlocks",
                keyColumn: "Id",
                keyValue: 5,
                columns: new[] { "Type", "Value" },
                values: new object[] { "image", "/images/topics/password2.png" });

            migrationBuilder.UpdateData(
                table: "ContentBlocks",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "Type", "Value" },
                values: new object[] { "image", "/images/topics/password3.png" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
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
                columns: new[] { "Type", "Value" },
                values: new object[] { "/images/topics/password2.png", "" });

            migrationBuilder.UpdateData(
                table: "ContentBlocks",
                keyColumn: "Id",
                keyValue: 6,
                columns: new[] { "Type", "Value" },
                values: new object[] { "/images/topics/password3.png", "" });
        }
    }
}
