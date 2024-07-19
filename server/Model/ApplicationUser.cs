using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace server.Model
{
    public class ApplicationUser : IdentityUser
    {
        [Required(ErrorMessage = "Please enter your name!")]
        [
            StringLength(30, ErrorMessage = "Name is too long!"),
            MinLength(2, ErrorMessage = "Name is too short!")
        ]
        public string? Name { get; set; }
        public ProfilePicture ProfilePicture { get; set; } =
            new ProfilePicture
            {
                Url =
                    "https://res.cloudinary.com/dhkaqwnyz/image/upload/v1719234863/emergency_fund/wjaus0t4qmmjmv7msajv.png",
                PublicId = "Default"
            };
        public RefreshToken RefreshToken { get; set; } = new RefreshToken();
    }

    [Owned]
    public class ProfilePicture
    {
        public string? Url { get; set; } =
            "https://res.cloudinary.com/dhkaqwnyz/image/upload/v1719234863/emergency_fund/wjaus0t4qmmjmv7msajv.png";

        public string? PublicId { get; set; } = "Default";
    }

    [Owned]
    public class RefreshToken
    {
        public string? Token { get; set; }
        public DateTime ExpiryTime { get; set; }
    }
}
