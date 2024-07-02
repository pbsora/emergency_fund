using AutoMapper;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.DTOs.Transactions;
using server.Model;
using server.Pagination.QueryParams;
using X.PagedList;

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

        public async Task<IEnumerable<GetTransactionDTO>> GetTransactionsAsync(
            string userId,
            TransactionParams transactionParams
        )
        {
            var transactions = _context
                .Transactions.Where(t => t.UserId == userId)
                .OrderByDescending(f => f.Date)
                .Select(t => new GetTransactionDTO
                {
                    TransactionId = t.TransactionId,
                    Amount = t.Amount,
                    Date = t.Date,
                    Description = t.Description,
                    UserId = t.UserId
                })
                .AsQueryable();

            //Criteria and amount filters
            if (!string.IsNullOrEmpty(transactionParams.Criteria) && transactionParams.Amount > 0)
            {
                if (transactionParams.Criteria == "gt")
                    transactions = transactions.Where(t => t.Amount > transactionParams.Amount);
                else if (transactionParams.Criteria == "lt")
                    transactions = transactions.Where(t => t.Amount < transactionParams.Amount);
            }

            //Month filter
            if (transactionParams.Month > 0 && transactionParams.Year > 0)
            {
                transactions = transactions.Where(f =>
                    f.Date.Month == transactionParams.Month && f.Date.Year == transactionParams.Year
                );
            }

            var filteredTransactions = await transactions.ToPagedListAsync(
                transactionParams.PageNumber,
                transactionParams.PageSize
            );

            if (filteredTransactions.Count == 0)
            {
                throw new KeyNotFoundException("No transactions found");
            }

            return filteredTransactions;
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
            var transaction = new Transaction
            {
                Amount = transactionDTO.Amount,
                UserId = userId,
                Description = transactionDTO.Description
            };

            await _context.Transactions.AddAsync(transaction);
            await _context.SaveChangesAsync();

            return transaction;
        }

        public async Task<GetTransactionDTO> UpdateTransaction(GetTransactionDTO transactionDTO)
        {
            Transaction transaction = _mapper.Map<Transaction>(transactionDTO);

            _context.Entry(transaction).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return _mapper.Map<GetTransactionDTO>(transaction);
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

        public async Task<object> GetTransactionStatus(string userId)
        {
            int count = await _context.Transactions.CountAsync(t => t.UserId == userId);

            if (count == 0)
            {
                throw new KeyNotFoundException("No transactions found");
            }

            double total = await _context
                .Transactions.Where(t => t.UserId == userId)
                .SumAsync(t => t.Amount);

            GetTransactionDTO? last = await _context
                .Transactions.Where(t => t.UserId == userId)
                .OrderByDescending(t => t.Date)
                .Select(t => new GetTransactionDTO
                {
                    TransactionId = t.TransactionId,
                    Amount = t.Amount,
                    Date = t.Date,
                })
                .FirstOrDefaultAsync();

            int months = await _context
                .Config.Where(c => c.UserId == userId)
                .Select(c => c.Months)
                .FirstOrDefaultAsync();

            return new
            {
                count,
                total,
                last,
                months
            };
        }
    }
}
