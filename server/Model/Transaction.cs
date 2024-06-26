using System.ComponentModel.DataAnnotations;

namespace server.Model
{
    public class Transaction
    {
        public Guid TransactionId { get; set; } = Guid.NewGuid();

        [Required(ErrorMessage = "Please enter this transaction's amount!")]
        public double Amount { get; set; }
        public DateTime Date { get; set; } = DateTime.Now;

        [MaxLength(100, ErrorMessage = "Description cannot be longer than 100 characters")]
        public string? Description { get; set; }

        [Required]
        public string? UserId { get; set; }
        public ApplicationUser User { get; set; } = null!;
    }
}
