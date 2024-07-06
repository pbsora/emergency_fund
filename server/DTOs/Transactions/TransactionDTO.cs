using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace server.DTOs.Transactions
{
    public class TransactionDTO : IValidatableObject
    {
        public Guid TransactionId { get; set; }

        [Required(ErrorMessage = "Please enter this transaction's amount!")]
        public double Amount { get; set; }
        public DateTime Date { get; set; }

        [MaxLength(100, ErrorMessage = "Description cannot be longer than 100 characters")]
        public string? Description { get; set; }

        public string? UserId { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (Date > DateTime.Now)
            {
                yield return new ValidationResult(
                    "Date cannot be in the future",
                    new[] { nameof(Date) }
                );
            }
        }
    }
}
