using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.DTOs.Transactions;
using server.Model;
using server.Repositories.Transactions;

namespace server.Controllers
{
    [ApiController]
    [Route("api/transactions")]
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionRepository _repository;

        public TransactionController(ITransactionRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public async Task<IActionResult> GetTransactionsAsync()
        {
            try
            {
                var userId = User
                    .Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)
                    ?.Value;

                if (userId == null)
                {
                    return StatusCode(403, "Unauthorized");
                }

                var transactions = await _repository.GetTransactionsAsync(userId);

                if (transactions == null)
                {
                    return StatusCode(404, "No transactions found");
                }

                return Ok(transactions);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }

        [HttpGet("{transactionId}", Name = "GetSingle"),]
        public async Task<ActionResult<GetTransactionDTO>> GetSingle(string transactionId)
        {
            try
            {
                Guid.TryParse(transactionId.ToString(), out Guid id);

                if (id == Guid.Empty)
                {
                    return StatusCode(400, "Invalid transaction id");
                }

                var transaction = await _repository.SingleTransactionAsync(
                    Guid.Parse(transactionId)
                );

                if (transaction == null)
                {
                    return StatusCode(404, "Transaction not found");
                }

                return Ok(transaction);
            }
            catch (Exception e)
            {
                if (isCustomException(e))
                {
                    return StatusCode(400, e.Message);
                }

                return StatusCode(500, "Something went wrong");
            }
        }

        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody] NewTransactionDTO transactionDTO)
        {
            try
            {
                var userId = User
                    .Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)
                    ?.Value;

                if (userId == null)
                {
                    return StatusCode(403, "Unauthorized");
                }

                var transaction = await _repository.CreateTransactionAsync(transactionDTO, userId);

                return new CreatedAtRouteResult(
                    "GetSingle",
                    new { transactionId = transaction.TransactionId },
                    transaction
                );
            }
            catch (Exception e)
            {
                if (isCustomException(e))
                {
                    return StatusCode(400, e.Message);
                }

                return StatusCode(500, "Something went wrong");
            }
        }

        [Authorize]
        [HttpPut]
        public async Task<IActionResult> PutAsync([FromBody] NewTransactionDTO transactionDTO)
        {
            try
            {
                var result = await _repository.UpdateTransaction(transactionDTO);

                if (!result)
                {
                    return StatusCode(404, "Transaction not found");
                }

                return Ok();
            }
            catch (Exception e)
            {
                if (isCustomException(e))
                {
                    return StatusCode(400, e.Message);
                }

                return StatusCode(500, "Something went wrong");
            }
        }

        [HttpDelete("{transactionId}")]
        public async Task<IActionResult> DeleteAsync(string transactionId)
        {
            try
            {
                var userId = User
                    .Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)
                    ?.Value;

                var userRole = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;

                if (userId == null)
                {
                    return StatusCode(403, "Unauthorized");
                }

                var transaction = await _repository.SingleTransactionAsync(
                    Guid.Parse(transactionId)
                );

                if (transaction.UserId != userId)
                {
                    return StatusCode(403, "Unauthorized");
                }

                var result = await _repository.DeleteTransactionAsync(transactionId);

                if (!result)
                {
                    return StatusCode(404, "Transaction not found");
                }

                return Ok("Deleted successfully");
            }
            catch (Exception e)
            {
                if (isCustomException(e))
                {
                    return StatusCode(400, e.Message);
                }

                return StatusCode(500, "Something went wrong");
            }
        }

        private Boolean isCustomException(Exception e)
        {
            return typeof(InvalidOperationException).IsInstanceOfType(e)
                || typeof(KeyNotFoundException).IsInstanceOfType(e)
                || typeof(ArgumentException).IsInstanceOfType(e);
        }
    }
}
