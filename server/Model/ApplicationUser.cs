using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace server.Model
{
    public class ApplicationUser : IdentityUser
    {
        [Required(ErrorMessage = "Please enter your name!")]
        public string? Name { get; set; }
        public string? ProfilePicture { get; set; } =
            "https://res.cloudinary.com/dhkaqwnyz/image/upload/v1719234863/emergency_fund/wjaus0t4qmmjmv7msajv.png";
        public string? RefreshToken { get; set; }
        public DateTime RefreshTokenExpiryTime { get; set; }
    }
}
