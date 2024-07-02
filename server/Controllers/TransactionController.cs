using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using server.DTOs.Transactions;
using server.Model;
using server.Pagination.QueryParams;
using server.Repositories.Transactions;

namespace server.Controllers
{
    [ApiController]
    [Route("api/transactions")]
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionRepository _repository;
        public readonly UserManager<ApplicationUser> _userManager;

        public TransactionController(
            ITransactionRepository repository,
            UserManager<ApplicationUser> userManager
        )
        {
            _repository = repository;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> GetTransactionsAsync(
            [FromQuery] TransactionParams transactionParams
        )
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

                var transactions = await _repository.GetTransactionsAsync(
                    userId,
                    transactionParams
                );

                if (transactions == null)
                {
                    return StatusCode(404, new { message = "No transactions found" });
                }

                return Ok(transactions);
            }
            catch (Exception e)
            {
                return StatusCode(500, new { message = e.Message });
            }
        }

        [HttpGet("{transactionId}", Name = "GetSingle"),]
        public async Task<IActionResult> GetSingle(string transactionId)
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
                return isCustomException(e);
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
                    return StatusCode(403);
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
                return isCustomException(e);
            }
        }

        [Authorize]
        [HttpPut]
        public async Task<IActionResult> PutAsync([FromBody] TransactionDTO transactionDTO)
        {
            try
            {
                string? userId = User.FindFirst(ClaimTypes.Name)?.Value;

                if (string.IsNullOrEmpty(userId))
                    return Unauthorized(new { message = "Not logged in" });

                var result = await _repository.UpdateTransaction(transactionDTO);

                if (result == null)
                {
                    return StatusCode(404, "Transaction not found");
                }

                return Ok(result);
            }
            catch (Exception e)
            {
                return isCustomException(e);
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

                if (userId == null)
                {
                    return StatusCode(403, "Unauthorized");
                }

                var userRole = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;

                var transaction = await _repository.SingleTransactionAsync(
                    Guid.Parse(transactionId)
                );

                var result = await _repository.DeleteTransactionAsync(transactionId);

                if (!result)
                {
                    return StatusCode(404, "Transaction not found");
                }

                return Ok("Deleted successfully");
            }
            catch (Exception e)
            {
                return isCustomException(e);
            }
        }

        [HttpGet("status")]
        public async Task<IActionResult> GetStatus()
        {
            try
            {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                if (userId == null)
                    return StatusCode(403, "Unauthorized");

                var transactions = await _repository.GetTransactionStatus(userId);

                return Ok(transactions);
            }
            catch (Exception e)
            {
                return isCustomException(e);
            }
        }

        private IActionResult isCustomException(Exception e)
        {
            if (
                typeof(InvalidOperationException).IsInstanceOfType(e)
                || typeof(ArgumentException).IsInstanceOfType(e)
            )
            {
                return StatusCode(400, new { message = e.Message });
            }

            if (typeof(KeyNotFoundException).IsInstanceOfType(e))
            {
                return StatusCode(404, new { message = e.Message });
            }

            return StatusCode(500, new { message = e.Message });
        }
    }
}
