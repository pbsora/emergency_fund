using System.Security.Claims;
using System.Text.Json;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using server.DTOs.Transactions;
using server.Model;
using server.Pagination.QueryParams;
using server.Repositories.Transactions;
using X.PagedList;

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
        public async Task<ActionResult<IPagedList<TransactionDTO>>> GetTransactionsAsync(
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
                    return Unauthorized();
                }

                var transactions = await _repository.GetTransactionsAsync(
                    userId,
                    transactionParams
                );

                if (transactions == null)
                {
                    return NotFound(new { message = "No transactions found" });
                }

                return PaginatedTransactions(transactions);
            }
            catch (Exception e)
            {
                return StatusCode(500, new { message = e.Message });
            }
        }

        [HttpGet("{transactionId}", Name = "GetSingle"),]
        public async Task<ActionResult<TransactionDTO>> GetSingle(string transactionId)
        {
            try
            {
                var userId = User
                    .Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)
                    ?.Value;

                if (userId == null)
                {
                    return Unauthorized();
                }

                Guid.TryParse(transactionId.ToString(), out Guid id);

                if (id == Guid.Empty)
                {
                    return BadRequest("Invalid transaction ID");
                }

                var transaction = await _repository.SingleTransactionAsync(
                    Guid.Parse(transactionId)
                );

                if (transaction == null)
                {
                    return NotFound("Transaction not found");
                }

                return Ok(transaction);
            }
            catch (Exception e)
            {
                return HandleException(e);
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

                if (!ModelState.IsValid)
                {
                    return BadRequest(
                        new { message = ModelState.Values.First().Errors.First().ErrorMessage }
                    );
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
                return HandleException(e);
            }
        }

        [Authorize]
        [HttpPut]
        public async Task<IActionResult> PutAsync([FromBody] TransactionDTO transactionDTO)
        {
            try
            {
                string? userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                if (string.IsNullOrEmpty(userId))
                    return Unauthorized(new { message = "Not logged in" });

                if (!ModelState.IsValid)
                {
                    return BadRequest(
                        new { message = ModelState.Values.First().Errors.First().ErrorMessage }
                    );
                }

                var result = await _repository.UpdateTransaction(transactionDTO);

                if (result == null)
                {
                    return NotFound("Transaction not found");
                }

                return Ok(result);
            }
            catch (Exception e)
            {
                return HandleException(e);
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
                    return Unauthorized();
                }

                var userRole = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;

                var result = await _repository.DeleteTransactionAsync(transactionId);

                if (!result)
                {
                    return NotFound("Transaction not found");
                }

                return Ok("Deleted successfully");
            }
            catch (Exception e)
            {
                return HandleException(e);
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
                return HandleException(e);
            }
        }

        private ActionResult HandleException(Exception e)
        {
            if (e is InvalidOperationException || e is ArgumentNullException)
            {
                return BadRequest(new { message = e.Message });
            }

            if (e is KeyNotFoundException)
            {
                return NotFound(new { message = e.Message });
            }

            return StatusCode(500, new { message = "Something went wrong!" });
        }

        private ActionResult<IPagedList<TransactionDTO>> PaginatedTransactions(
            IPagedList<TransactionDTO> transactions
        )
        {
            var metadata = new
            {
                transactions.Count,
                transactions.PageSize,
                transactions.PageCount,
                transactions.TotalItemCount,
                transactions.HasNextPage,
                transactions.HasPreviousPage,
                transactions.PageNumber
            };

            Response.Headers.Append("X-Pagination", JsonSerializer.Serialize(metadata));
            return Ok(transactions);
        }
    }
}
