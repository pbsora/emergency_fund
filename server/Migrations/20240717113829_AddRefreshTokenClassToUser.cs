using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class AddRefreshTokenClassToUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6b2e55da-3ab7-489c-8c64-adab894bcd44");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f073874e-02d8-44cf-b8ec-ecb55ce536d3");

            migrationBuilder.RenameColumn(
                name: "RefreshTokenExpiryTime",
                table: "AspNetUsers",
                newName: "RefreshToken_ExpiryTime");

            migrationBuilder.RenameColumn(
                name: "RefreshToken",
                table: "AspNetUsers",
                newName: "RefreshToken_Token");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "61516175-dd8f-47a3-b4e0-39e510b8f131", null, "User", "USER" },
                    { "ddee3381-5ae9-474c-8977-a275f7c5025e", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "61516175-dd8f-47a3-b4e0-39e510b8f131");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ddee3381-5ae9-474c-8977-a275f7c5025e");

            migrationBuilder.RenameColumn(
                name: "RefreshToken_Token",
                table: "AspNetUsers",
                newName: "RefreshToken");

            migrationBuilder.RenameColumn(
                name: "RefreshToken_ExpiryTime",
                table: "AspNetUsers",
                newName: "RefreshTokenExpiryTime");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "6b2e55da-3ab7-489c-8c64-adab894bcd44", null, "User", "USER" },
                    { "f073874e-02d8-44cf-b8ec-ecb55ce536d3", null, "Admin", "ADMIN" }
                });
        }
    }
}
