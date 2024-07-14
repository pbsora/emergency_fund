using backend_tests.Config;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Moq;
using server.Controllers;
using server.DTOs.Transactions;
using server.Model;
using server.Pagination.QueryParams;
using server.Repositories.Transactions;
using System.Security.Claims;
using X.PagedList;

namespace backend_tests.Controllers
{
    public class TransactionControllerTests
    {
        private readonly Mock<ITransactionRepository> _transactionRepository;
        private readonly Mock<UserManager<ApplicationUser>> _userManager;

        public TransactionControllerTests()
        {
            _transactionRepository = new Mock<ITransactionRepository>();

            var users = new List<ApplicationUser>
            {
                new ApplicationUser { Id = "1", UserName = "user1" },
                new ApplicationUser { Id = "2", UserName = "user2" }
            };

            _userManager = UserManagerMock.CreateMockUserManager<ApplicationUser>(users);
        }

        public ControllerContext GetControllerContext(string userId)
        {
            var claims = new List<Claim> { new Claim(ClaimTypes.NameIdentifier, userId) };
            var identity = new ClaimsIdentity(claims, "TestAuthType");
            var claimsPrincipal = new ClaimsPrincipal(identity);

            var mockHttpContext = new Mock<HttpContext>();
            mockHttpContext.Setup(context => context.User).Returns(claimsPrincipal);

            // Mock the Response object to avoid exceptions when setting headers
            var response = new Mock<HttpResponse>();
            var responseHeaders = new HeaderDictionary();
            response.SetupGet(r => r.Headers).Returns(responseHeaders);

            mockHttpContext.Setup(context => context.Response).Returns(response.Object);

            return new ControllerContext { HttpContext = mockHttpContext.Object };
        }

        public TransactionController GetController(string userId)
        {
            var controllerContext = GetControllerContext(userId);
            return new TransactionController(
                               _transactionRepository.Object,
                                              _userManager.Object
                                                         )
            {
                ControllerContext = controllerContext
            };
        }


        [Fact]
        public async Task GetTransactionsAsync_ValidRequest_ReturnsTransactions()
        {
            // Arrange
            var userId = Guid.NewGuid();
            var controller = GetController(userId.ToString());

            var transactionParams = new TransactionParams();
            var transactions = new List<TransactionDTO>
            {
                new TransactionDTO
                {
                    TransactionId = Guid.NewGuid(),
                    Amount = 100,
                    Date = DateTime.UtcNow,
                    Description = "Test transaction",
                    UserId = userId.ToString()
                },
                new TransactionDTO
                {
                    TransactionId = Guid.NewGuid(),
                    Amount = 200,
                    Date = DateTime.UtcNow,
                    Description = "Test transaction 2",
                    UserId = userId.ToString()
                }
            }.AsQueryable();

            var pagedList = new StaticPagedList<TransactionDTO>(transactions, 1, 10, 2);

            _transactionRepository.Setup(x => x.GetTransactionsAsync(userId.ToString(), transactionParams))
                .ReturnsAsync(pagedList);

            // Act

            var result = await controller.GetTransactionsAsync(transactionParams);

            // Assert

            var okResult = result.Result as OkObjectResult;
            okResult.Should().NotBeNull("Result should be an OkObjectResult");

            var returnedTransactions = okResult?.Value as IPagedList<TransactionDTO>;
            returnedTransactions.Should().NotBeNull();
            returnedTransactions!.Count.Should().Be(2);
            returnedTransactions[0].Amount.Should().Be(100);
            returnedTransactions[1].Amount.Should().Be(200);
        }


        [Fact]
        public async Task GetTransactionsAsync_NoTransactionsFound_ReturnsNotFound()
        {
            // Arrange

            var userId = Guid.NewGuid();
            var controller = GetController(userId.ToString());

            var transactionParams = new TransactionParams();

            _transactionRepository.Setup(x => x.GetTransactionsAsync(userId.ToString(), transactionParams))
                .ReturnsAsync((IPagedList<TransactionDTO>)null!);

            // Act

            var result = await controller.GetTransactionsAsync(new TransactionParams());

            // Assert

            var notFoundResult = result.Result as NotFoundObjectResult;
            notFoundResult.Should().BeOfType<NotFoundObjectResult>().Which.StatusCode.Should().Be(404);
            notFoundResult.Should().NotBeNull();
            notFoundResult!.StatusCode.Should().Be(404);


        }

        [Fact]
        public async Task GetSingle_ValidId_ReturnsTransaction()
        {
            // Arrange
            var userId = Guid.NewGuid();
            var controller = GetController(userId.ToString());

            var transactionId = Guid.NewGuid();
            var transaction = new TransactionDTO
            {
                UserId = userId.ToString(),
                Amount = 100,
                Description = "Test transaction"
            };

            var transactionMock = new Mock<TransactionDTO>();

            _transactionRepository
                .Setup(x => x.SingleTransactionAsync(transactionId))
                .ReturnsAsync(transaction);



            // Act

            var result = await controller.GetSingle(transactionId.ToString());

            // Assert

            var okResult = result.Result as OkObjectResult;
            okResult.Should().NotBeNull();
            okResult!.StatusCode.Should().Be(200);
            var returnedTransaction = okResult.Value as TransactionDTO;
            returnedTransaction.Should().NotBeNull();
            returnedTransaction!.UserId.Should().Be(userId.ToString());
            returnedTransaction.Amount.Should().Be(100);
            returnedTransaction.Description.Should().Be("Test transaction");
            returnedTransaction.Should().BeEquivalentTo(transaction);
        }

        [Fact]
        public async Task GetSingle_InvalidId_ReturnsNotFound()
        {
            // Arrange
            var userId = Guid.NewGuid();
            var transactionId = Guid.NewGuid();
            var controller = GetController(userId.ToString());

            // Act

            var result = await controller.GetSingle(transactionId.ToString());

            // Assert

            var badRequestResult = result.Result as NotFoundObjectResult;
            badRequestResult!.StatusCode.Should().Be(404);
            badRequestResult.Value.Should().Be("Transaction not found");
        }

        [Fact]
        public async Task PostAsync_ValidNewTransaction_ReturnsCreated()
        {
            // Arrange
            var userId = Guid.NewGuid();
            var controller = GetController(userId.ToString());

            var transaction = new Transaction
            {
                UserId = userId.ToString(),
                Amount = 100,
                Description = "Test transaction",
            };

            var transactionDTO = new NewTransactionDTO
            {
                Amount = 100,
                Description = "Test transaction"
            };




            _transactionRepository
                .Setup(x => x.CreateTransactionAsync(transactionDTO, userId.ToString()))
                .ReturnsAsync(transaction);

            // Act

            var result = await controller.PostAsync(transactionDTO);

            // Assert

            var createdResult = result as CreatedAtRouteResult;
            createdResult.Should().NotBeNull();
            createdResult!.StatusCode.Should().Be(201);
            var returnedTransaction = createdResult.Value as Transaction;
            returnedTransaction.Should().NotBeNull();
            returnedTransaction!.UserId.Should().Be(userId.ToString());
            returnedTransaction.Amount.Should().Be(100);
            returnedTransaction.Description.Should().Be("Test transaction");
            returnedTransaction.Should().BeEquivalentTo(transaction);
        }


        [Fact]
        public async Task PostAsync_InvalidTransaction_ReturnsBadRequest()
        {
            // Arrange
            var userId = Guid.NewGuid();
            var controller = GetController(userId.ToString());
            controller.ModelState.AddModelError
                ("Test", "Test model error");

            // Act

            var result = await controller.PostAsync(new NewTransactionDTO());

            // Assert

            var badRequestResult = result as BadRequestObjectResult;
            badRequestResult.Should().BeOfType<BadRequestObjectResult>().Which.StatusCode.Should().Be(400);
        }

        [Fact]
        public async Task PutAsync_ValidTransaction_ReturnsOk()
        {
            // Arrange

            var userId = Guid.NewGuid();
            var controller = GetController(userId.ToString());

            TransactionDTO transaction = new TransactionDTO
            {
                UserId = userId.ToString(),
                Amount = 100,
                Description = "Test transaction"
            };

            _transactionRepository
                .Setup(x => x.UpdateTransaction(transaction))
                .ReturnsAsync(transaction);




            // Act

            var result = await controller.PutAsync(transaction);

            // Assert

            var okResult = result as OkObjectResult;
            okResult.Should().NotBeNull();
            okResult.Should().BeOfType<OkObjectResult>().Which.StatusCode.Should().Be(200);
            var returnedTransaction = okResult!.Value as TransactionDTO;
            returnedTransaction.Should().NotBeNull();
            returnedTransaction!.UserId.Should().Be(userId.ToString());
            returnedTransaction.Amount.Should().Be(100);
            returnedTransaction.Description.Should().Be("Test transaction");
            returnedTransaction.Should().BeEquivalentTo(transaction);
        }

        [Fact]
        public async Task PutAsync_InvalidTransaction_ReturnsBadRequest()
        {
            // Arrange
            var userId = Guid.NewGuid();
            var controller = GetController(userId.ToString());

            var transaction = new TransactionDTO();
            controller.ModelState.AddModelError("Test", "Test model error");

            // Act

            var result = await controller.PutAsync(transaction);

            // Assert

            var badRequestResult = result as BadRequestObjectResult;
            badRequestResult.Should().BeOfType<BadRequestObjectResult>().Which.StatusCode.Should().Be(400);

        }

        [Fact]
        public async Task PutAsync_InexistentTransaction_ReturnsNotFound()
        {
            // Arrange
            var userId = Guid.NewGuid();
            var controller = GetController(userId.ToString());

            var transaction = new TransactionDTO
            {
                UserId = userId.ToString(),
                Amount = 100,
                Description = "Test transaction"
            };

            _transactionRepository
                .Setup(x => x.UpdateTransaction(transaction))
                .ReturnsAsync((TransactionDTO)null!);

            // Act

            var result = await controller.PutAsync(transaction);

            // Assert

            var notFoundResult = result as NotFoundObjectResult;
            notFoundResult.Should().BeOfType<NotFoundObjectResult>().Which.StatusCode.Should().Be(404);
        }


        [Fact]
        public async Task DeleteAsync_ValidId_ReturnsOk()
        {
            // Arrange
            var userId = Guid.NewGuid();
            var controller = GetController(userId.ToString());


            _transactionRepository.Setup(x => x.DeleteTransactionAsync(It.IsAny<string>()))
                .ReturnsAsync(true);

            // Act

            var result = await controller.DeleteAsync(It.IsAny<string>());

            // Assert


            result.Should().BeOfType<OkObjectResult>().Which.StatusCode.Should().Be(200);

        }


        [Fact]
        public async void DeleteAsync_InexistentTransaction_ReturnsNotFound()
        {
            // Arrange
            var userId = Guid.NewGuid();
            var controller = GetController(userId.ToString());

            _transactionRepository.Setup(x => x.DeleteTransactionAsync(It.IsAny<string>()))
                .ThrowsAsync(new KeyNotFoundException());

            // Act

            var result = await controller.DeleteAsync(Guid.NewGuid().ToString());

            // Assert

            result.Should().BeOfType<NotFoundObjectResult>().Which.StatusCode.Should().Be(404);

        }
    }
}
