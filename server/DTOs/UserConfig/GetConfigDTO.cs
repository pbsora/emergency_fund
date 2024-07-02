using System.ComponentModel.DataAnnotations;

namespace server.DTOs.UserConfig
{
    public class GetConfigDTO
    {
        public Guid Id { get; set; }
        public double MonthlyExpenses { get; set; }

        public int Months { get; set; }

        [Required]
        public string? UserId { get; set; }
    }
}
