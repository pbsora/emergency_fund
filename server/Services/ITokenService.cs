using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using server.Model;

namespace server.Services
{
    public interface ITokenService
    {
        string CreateToken(ApplicationUser user, List<string> roles);

        string GenerateRefreshToken();

        ClaimsPrincipal GetPrincipalFromExpiredToken(string token);
    }
}
