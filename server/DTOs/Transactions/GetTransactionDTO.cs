namespace server.DTOs.Transactions
{
    public class GetTransactionDTO
    {
        public Guid TransactionId { get; set; }
        public double Amount { get; set; }
        public DateTime Date { get; set; }
        public string? UserId { get; set; }
    }
}
