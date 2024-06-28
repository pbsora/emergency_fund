using server.DTOs.Transactions;
using server.Model;

namespace server.Repositories.Transactions
{
    public interface ITransactionRepository
    {
        Task<IEnumerable<GetTransactionDTO>> GetTransactionsAsync(string userId);
        Task<GetTransactionDTO> SingleTransactionAsync(Guid transactionId);
        Task<Transaction> CreateTransactionAsync(NewTransactionDTO transaction, string userId);
        Task<Boolean> UpdateTransaction(NewTransactionDTO transaction);
        Task<Boolean> DeleteTransactionAsync(string transactionId);
        Task<object> GetTransactionStatus(string userId);
    }
}
