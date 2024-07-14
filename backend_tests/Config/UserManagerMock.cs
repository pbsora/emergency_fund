using Microsoft.AspNetCore.Identity;
using Moq;

namespace backend_tests.Config
{
    public class UserManagerMock
    {
        public static Mock<UserManager<TUser>> CreateMockUserManager<TUser>(List<TUser> userList) where TUser : class
        {
            var store = new Mock<IUserStore<TUser>>();
            var userManager = new Mock<UserManager<TUser>>(store.Object, null, null, null, null, null, null, null, null);

            userManager.Setup(x => x.Users).Returns(userList.AsQueryable());
            userManager.Setup(x => x.FindByIdAsync(It.IsAny<string>())).ReturnsAsync((string id) => userList.FirstOrDefault(u => (u as IdentityUser)?.Id == id) as TUser);
            userManager.Setup(x => x.FindByNameAsync(It.IsAny<string>())).ReturnsAsync((string userName) => userList.FirstOrDefault(u => (u as IdentityUser)?.UserName == userName) as TUser);
            userManager.Setup(x => x.CreateAsync(It.IsAny<TUser>(), It.IsAny<string>())).ReturnsAsync(IdentityResult.Success);
            userManager.Setup(x => x.UpdateAsync(It.IsAny<TUser>())).ReturnsAsync(IdentityResult.Success);

            // Add other setups as needed

            return userManager;
        }
    }
}
