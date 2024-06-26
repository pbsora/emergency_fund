using System.ComponentModel.DataAnnotations;

namespace server.DTOs.UserConfig
{
    public class CreateConfigDTO
    {
        [Required(ErrorMessage = "Please enter your goal amount!"), Range(1, double.MaxValue)]
        public double GoalAmount { get; set; }

        [Required(ErrorMessage = "Please enter your monthly income!"), Range(1, double.MaxValue)]
        public double MonthlyIncome { get; set; }

        [Required(ErrorMessage = "How many months do you plan on saving?!"), Range(1, 24)]
        public int Months { get; set; }

        [Required]
        public string? UserId { get; set; }
    }
}
