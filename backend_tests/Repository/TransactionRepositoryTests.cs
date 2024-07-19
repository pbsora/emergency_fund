using AutoMapper;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.DTOs.Transactions;
using server.Model;
using server.Pagination.QueryParams;
using server.Repositories.Transactions;
using X.PagedList;

namespace backend_tests.Repository
{
    public class TransactionRepositoryTests
    {
        private readonly IMapper _mapper;

        public TransactionRepositoryTests()
        {
            var mappingConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new TransactionDTOMappingProfile());
            });
            IMapper mapper = mappingConfig.CreateMapper();
            _mapper = mapper;
        }

        private async Task<AppDbContext> GetDbContext()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: "Test")
                .Options;
            var databaseContext = new AppDbContext(options);
            await databaseContext.Database.EnsureCreatedAsync();

            return databaseContext;
        }

        [Fact]
        public async Task GetTransactionsAsync_NoTransactions_ThrowsException()
        {
            // Arrange
            using var context = await GetDbContext();
            var transactionRepository = new TransactionRepository(context, _mapper);
            var userId = Guid.NewGuid().ToString();
            var transactionParams = new TransactionParams();

            // Act
            Func<Task> action = async () =>
                await transactionRepository.GetTransactionsAsync(userId, transactionParams);

            // Assert
            await action.Should().ThrowAsync<KeyNotFoundException>();
        }

        [Fact]
        public async Task GetTransactionsAsync_MultipleTransactions_ReturnsIPagedList()
        {
            // Arrange
            using var context = await GetDbContext();
            var transactionRepository = new TransactionRepository(context, _mapper);
            var userId = Guid.NewGuid().ToString();
            var transactionParams = new TransactionParams();

            var transaction = new Transaction
            {
                Amount = 100,
                Description = "Test",
                Date = DateTime.Now,
                UserId = userId
            };

            var transaction2 = new Transaction
            {
                Amount = 100,
                Description = "Test",
                Date = DateTime.Now,
                UserId = userId
            };

            await context.Transactions.AddRangeAsync(transaction, transaction2);
            await context.SaveChangesAsync();

            // Act


            var result = await transactionRepository.GetTransactionsAsync(
                userId,
                transactionParams
            );

            // Assert
            result.Should().NotBeNull();
            result.Should().BeAssignableTo<IPagedList<TransactionDTO>>();
            result.Count.Should().Be(2);
        }

        [Fact]
        public async Task SingleTransactionAsync_ValidTransactionId_ReturnsTransaction()
        {
            // Arrange

            using var context = await GetDbContext();
            var transactionRepository = new TransactionRepository(context, _mapper);

            NewTransactionDTO transactionDTO = new NewTransactionDTO
            {
                Amount = 100,
                Description = "Test",
                Date = DateTime.Now
            };

            string userId = "1";

            var createdTransaction = await transactionRepository.CreateTransactionAsync(
                transactionDTO,
                userId
            );

            // Act

            var transaction = await transactionRepository.SingleTransactionAsync(
                createdTransaction.TransactionId
            );

            // Assert

            transaction.Should().NotBeNull();
            transaction.Should().BeOfType<TransactionDTO>();
            transaction
                .Should()
                .BeEquivalentTo(transactionDTO, options => options.ExcludingMissingMembers());
        }

        [Fact]
        public async Task SingleTransactionAsync_InvalidId_ThrowsException()
        {
            // Arrange

            using var context = await GetDbContext();
            var transactionRepository = new TransactionRepository(context, _mapper);

            // Act

            Func<Task> action = async () =>
                await transactionRepository.SingleTransactionAsync(Guid.Empty);

            // Assert

            await action.Should().ThrowAsync<InvalidOperationException>();
        }

        [Fact]
        public async Task SingleTransactionAsync_UnexistentId_ThrowsException()
        {
            // Arrange

            using var context = await GetDbContext();
            var transactionRepository = new TransactionRepository(context, _mapper);

            // Act

            Func<Task> action = async () =>
                await transactionRepository.SingleTransactionAsync(Guid.NewGuid());

            // Assert

            await action.Should().ThrowAsync<KeyNotFoundException>();
        }

        [Fact]
        public async Task CreateTransactionAsync_ValidTransaction_ReturnsTransaction()
        {
            // Arrange

            using var context = await GetDbContext();
            var transactionRepository = new TransactionRepository(context, _mapper);

            NewTransactionDTO transaction = new NewTransactionDTO
            {
                Amount = 100,
                Description = "Test",
                Date = DateTime.Now
            };

            string userId = "1";

            var result = await transactionRepository.CreateTransactionAsync(transaction, userId);

            // Act

            var createdTransaction = context.Transactions.FirstOrDefault(t =>
                t.TransactionId == result.TransactionId
            );

            // Assert

            createdTransaction.Should().NotBeNull();
            createdTransaction.Should().BeOfType<Transaction>();
            createdTransaction
                .Should()
                .BeEquivalentTo(transaction, options => options.ExcludingMissingMembers());
            createdTransaction!.UserId.Should().Be(userId);
        }

        [Fact]
        public async Task UpdateTransaction_ValidTransaction_ReturnsTransactionDTO()
        {
            // Arrange
            using var context = await GetDbContext();
            var transactionRepository = new TransactionRepository(context, _mapper);

            NewTransactionDTO transaction = new NewTransactionDTO
            {
                Amount = 100,
                Description = "Test",
                Date = DateTime.Now
            };

            string userId = "1";

            var createdTransaction = await transactionRepository.CreateTransactionAsync(
                transaction,
                userId
            );

            var updatedTransaction = new TransactionDTO
            {
                TransactionId = createdTransaction.TransactionId,
                Amount = 200,
                Description = "Test2",
                Date = DateTime.Now,
                UserId = userId
            };

            context.Entry(createdTransaction).State = EntityState.Detached;

            // Act

            var result = await transactionRepository.UpdateTransaction(updatedTransaction);

            // Assert

            result.Amount.Should().Be(updatedTransaction.Amount);
            result.Description.Should().Be(updatedTransaction.Description);
            result.Date.Should().Be(updatedTransaction.Date);
        }

        [Fact]
        public async Task DeleteTransaction_ValidTransactionId_ReturnsTrue()
        {
            // Arrange
            using var context = await GetDbContext();
            var transactionRepository = new TransactionRepository(context, _mapper);

            NewTransactionDTO transaction = new NewTransactionDTO
            {
                Amount = 100,
                Description = "Test",
                Date = DateTime.Now
            };

            string userId = "1";

            var createdTransaction = await transactionRepository.CreateTransactionAsync(
                transaction,
                userId
            );

            // Act

            var result = await transactionRepository.DeleteTransactionAsync(
                createdTransaction.TransactionId.ToString()
            );

            // Assert

            result.Should().BeTrue();
        }

        [Fact]
        public async Task DeleteTransaction_InvalidTransactionId_ThrowsException()
        {
            // Arrange
            using var context = await GetDbContext();
            var transactionRepository = new TransactionRepository(context, _mapper);

            // Act

            Func<Task> action = async () =>
                await transactionRepository.DeleteTransactionAsync(Guid.Empty.ToString());

            // Assert

            await action.Should().ThrowAsync<KeyNotFoundException>();
        }
    }
}
