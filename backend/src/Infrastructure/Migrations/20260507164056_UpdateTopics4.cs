using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CyberSecurity.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UpdateTopics4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "ContentBlocks",
                keyColumn: "Id",
                keyValue: 18,
                column: "Value",
                value: "/images/topics/site-page1.jpg");

            migrationBuilder.UpdateData(
                table: "ContentBlocks",
                keyColumn: "Id",
                keyValue: 19,
                column: "Value",
                value: "/images/topics/site-page2.jpg");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "ContentBlocks",
                keyColumn: "Id",
                keyValue: 18,
                column: "Value",
                value: "/images/topics/site-page1.png");

            migrationBuilder.UpdateData(
                table: "ContentBlocks",
                keyColumn: "Id",
                keyValue: 19,
                column: "Value",
                value: "/images/topics/site-page2.png");
        }
    }
}
