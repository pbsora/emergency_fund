using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
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
        public string? RefreshToken { get; set; }
        public DateTime RefreshTokenExpiryTime { get; set; }
    }

    [Owned]
    public class ProfilePicture
    {
        public string? Url { get; set; }

        public string? PublicId { get; set; }
    }
}
