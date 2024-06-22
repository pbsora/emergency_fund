namespace server.DTOs.UserConfig
{
    public class CreateConfigDTO
    {
        public double GoalAmount { get; set; }
        public double MonthlyIncome { get; set; }
        public int Months { get; set; }
        public string? UserId { get; set; }
    }
}
