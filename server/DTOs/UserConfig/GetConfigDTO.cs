using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace server.DTOs.UserConfig
{
    public class GetConfigDTO
    {
        public Guid Id { get; set; }
        public double GoalAmount { get; set; }
        public double MonthlyIncome { get; set; }
        public int Months { get; set; }

        [Required]
        public string? UserId { get; set; }
    }
}
