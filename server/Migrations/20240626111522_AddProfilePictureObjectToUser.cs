using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace server.Migrations
{
    /// <inheritdoc />
    public partial class AddProfilePictureObjectToUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5cf4f99a-f6c4-450c-a15a-e121c8cd3790");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "93352ccb-c56a-4d7c-8df3-cd1363c84a9d");

            migrationBuilder.RenameColumn(
                name: "ProfilePicture",
                table: "AspNetUsers",
                newName: "ProfilePicture_Url");

            migrationBuilder.AddColumn<string>(
                name: "ProfilePicture_PublicId",
                table: "AspNetUsers",
                type: "text",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "291682fb-39d6-4616-84b2-dfac4b56a65b", null, "Admin", "ADMIN" },
                    { "bd973084-d648-47ed-a942-594a416139c5", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "291682fb-39d6-4616-84b2-dfac4b56a65b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "bd973084-d648-47ed-a942-594a416139c5");

            migrationBuilder.DropColumn(
                name: "ProfilePicture_PublicId",
                table: "AspNetUsers");

            migrationBuilder.RenameColumn(
                name: "ProfilePicture_Url",
                table: "AspNetUsers",
                newName: "ProfilePicture");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "5cf4f99a-f6c4-450c-a15a-e121c8cd3790", null, "Admin", "ADMIN" },
                    { "93352ccb-c56a-4d7c-8df3-cd1363c84a9d", null, "User", "USER" }
                });
        }
    }
}
