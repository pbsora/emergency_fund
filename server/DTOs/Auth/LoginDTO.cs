using System.ComponentModel.DataAnnotations;

namespace server.DTOs.Auth
{
    public class LoginDTO
    {
        [Required, MinLength(3, ErrorMessage = "Username must be at least 3 characters long")]
        public string? Username { get; set; }

        [Required, MinLength(6, ErrorMessage = "Password must be at least 6 characters long")]
        public string? Password { get; set; }
    }
}
