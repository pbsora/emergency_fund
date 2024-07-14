using System.ComponentModel.DataAnnotations;

namespace server.DTOs.UserConfig
{
    public class ConfigDTO
    {
        public Guid Id { get; set; }

        [Required(ErrorMessage = "Please enter your monthly income!"), Range(1, double.MaxValue)]
        public double MonthlyExpenses { get; set; }

        [Required(ErrorMessage = "How many months do you plan on saving?!"), Range(1, 12)]
        public int Months { get; set; }
        public string? UserId { get; set; }
    }
}
