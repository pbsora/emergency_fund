using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace server.DTOs.UserConfig
{
    public class UpdateConfigDTO
    {
        public Guid Id { get; set; }

        [Required(ErrorMessage = "Please enter your goal amount!"), Range(1, double.MaxValue)]
        public double GoalAmount { get; set; }

        [Required(ErrorMessage = "Please enter your monthly income!"), Range(1, double.MaxValue)]
        public double MonthlyIncome { get; set; }

        [Required(ErrorMessage = "How many months do you plan on saving?!"), Range(1, 12)]
        public int Months { get; set; }

        public string? UserId { get; set; }
    }
}
