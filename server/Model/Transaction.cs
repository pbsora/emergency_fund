using System.ComponentModel.DataAnnotations;

namespace server.Model
{
    public class Transaction
    {
        public Guid TransactionId { get; set; } = Guid.NewGuid();

        [Required(ErrorMessage = "Please enter this transaction's amount!")]
        public double Amount { get; set; }
        public DateTime Date { get; set; } = DateTime.Now;
        public string? Description { get; set; }
        public string? UserId { get; set; }
        public ApplicationUser User { get; set; } = null!;
    }
}
