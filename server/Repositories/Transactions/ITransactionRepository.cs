using server.DTOs.Transactions;
using server.Model;
using server.Pagination.QueryParams;
using X.PagedList;

namespace server.Repositories.Transactions
{
    public interface ITransactionRepository
    {
        Task<IPagedList<TransactionDTO>> GetTransactionsAsync(
            string userId,
            TransactionParams transactionParams
        );
        Task<TransactionDTO> SingleTransactionAsync(Guid transactionId);
        Task<Transaction> CreateTransactionAsync(NewTransactionDTO transaction, string userId);
        Task<TransactionDTO> UpdateTransaction(TransactionDTO transaction);
        Task<Boolean> DeleteTransactionAsync(string transactionId);
        Task<object> GetTransactionStatus(string userId);
    }
}
