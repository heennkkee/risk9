using Microsoft.EntityFrameworkCore.Migrations;

namespace risk9.Migrations
{
    public partial class AddNumberField : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "NumberThing",
                table: "Assets",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NumberThing",
                table: "Assets");
        }
    }
}
