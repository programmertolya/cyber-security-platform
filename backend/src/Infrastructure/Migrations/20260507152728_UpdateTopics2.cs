using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CyberSecurity.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UpdateTopics2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "ContentBlocks",
                keyColumn: "Id",
                keyValue: 2,
                column: "Value",
                value: "/images/topics/confidence-page.png");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "ContentBlocks",
                keyColumn: "Id",
                keyValue: 2,
                column: "Value",
                value: "images/topics/confidence-page.png");
        }
    }
}
