using AutoMapper;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.DTOs.Transactions;
using server.Model;

namespace server.Repositories.Transactions
{
    public class TransactionRepository : ITransactionRepository
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public TransactionRepository(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IEnumerable<GetTransactionDTO>> GetTransactionsAsync(string userId)
        {
            var transactions = await _context
                .Transactions.Where(t => t.UserId == userId)
                .OrderByDescending(f => f.Date)
                .Select(t => new GetTransactionDTO
                {
                    TransactionId = t.TransactionId,
                    Amount = t.Amount,
                    Date = t.Date,
                    UserId = t.UserId
                })
                .ToListAsync();

            if (transactions.Count == 0)
            {
                throw new KeyNotFoundException("No transactions found");
            }

            return transactions;
        }

        public async Task<GetTransactionDTO> SingleTransactionAsync(Guid transactionId)
        {
            if (transactionId == Guid.Empty)
            {
                throw new InvalidOperationException("Invalid transaction id");
            }

            var transaction = await _context.Transactions.FirstOrDefaultAsync(t =>
                t.TransactionId == transactionId
            );

            if (transaction == null)
            {
                throw new KeyNotFoundException("Transaction not found");
            }

            return _mapper.Map<GetTransactionDTO>(transaction);
        }

        public async Task<Transaction> CreateTransactionAsync(
            NewTransactionDTO transactionDTO,
            string userId
        )
        {
            var transaction = new Transaction { Amount = transactionDTO.Amount, UserId = userId };

            await _context.Transactions.AddAsync(transaction);
            await _context.SaveChangesAsync();

            return transaction;
        }

        public async Task<Boolean> UpdateTransaction(NewTransactionDTO transactionDTO)
        {
            Transaction transaction = _mapper.Map<Transaction>(transactionDTO);

            _context.Entry(transaction).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<Boolean> DeleteTransactionAsync(string transactionId)
        {
            var transaction = await _context.Transactions.FirstOrDefaultAsync(t =>
                t.TransactionId == Guid.Parse(transactionId)
            );

            if (transaction == null)
            {
                throw new KeyNotFoundException("Transaction not found");
            }

            var res = _context.Transactions.Remove(transaction);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
