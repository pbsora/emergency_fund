namespace server.Model
{
    public class Config
    {
        public Guid Id { get; set; } = new Guid();
        public double GoalAmount { get; set; }
        public double MonthlyIncome { get; set; }
        public string? UserId { get; set; }
        public ApplicationUser User { get; set; } = null!;
    }
}
