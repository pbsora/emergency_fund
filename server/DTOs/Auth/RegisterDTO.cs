using System.ComponentModel.DataAnnotations;

namespace server.DTOs.Auth
{
    public class RegisterDTO
    {
        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public string Username { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string? Email { get; set; }

        [Required]
        public string Password { get; set; } = string.Empty;
        public string ConfirmPassword { get; set; } = string.Empty;
    }
}
