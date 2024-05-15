using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace server.Services
{
    public class TokenService : ITokenService
    {
        public JwtSecurityToken GenerateAccessToken(
            IEnumerable<Claim> claims,
            IConfiguration _config
        )
        {
            var key =
                _config.GetSection("JWT").GetValue<string>("SecretKey")
                ?? throw new InvalidOperationException("Invalid secret Key");
        }

        public string GenerateRefreshToken()
        {
            throw new NotImplementedException();
        }

        public ClaimsPrincipal GetPrincipalFromExpiredToken(string token, IConfiguration _config)
        {
            throw new NotImplementedException();
        }
    }
}
