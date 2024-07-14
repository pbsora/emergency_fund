using System.ComponentModel.DataAnnotations;

namespace server.DTOs.UserConfig
{
    public class CreateConfigDTO
    {
        [Required(ErrorMessage = "Please enter your monthly expenses!"), Range(1, double.MaxValue)]
        public double MonthlyExpenses { get; set; }

        [Required(ErrorMessage = "How many months do you plan on saving?!"), Range(1, 12)]
        public int Months { get; set; }

        [Required]
        public string? UserId { get; set; }
    }
}
