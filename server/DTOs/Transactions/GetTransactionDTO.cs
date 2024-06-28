using System.ComponentModel.DataAnnotations;

namespace server.DTOs.Transactions
{
    public class GetTransactionDTO
    {
        public Guid TransactionId { get; set; }

        [Required(ErrorMessage = "Please enter this transaction's amount!")]
        public double Amount { get; set; }
        public DateTime Date { get; set; }

        [MaxLength(100, ErrorMessage = "Description cannot be longer than 100 characters")]
        public string? Description { get; set; }
    }
}
