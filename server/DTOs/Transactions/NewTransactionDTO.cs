using System.ComponentModel.DataAnnotations;

namespace server.DTOs.Transactions
{
    public class NewTransactionDTO : IValidatableObject
    {
        [Required(ErrorMessage = "Please enter this transaction's amount!"), Range(1, 1000000)]
        public double Amount { get; set; }
        public DateTime Date { get; set; } = DateTime.Now;

        [MaxLength(100, ErrorMessage = "Description cannot be longer than 100 characters")]
        public string? Description { get; set; }

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
