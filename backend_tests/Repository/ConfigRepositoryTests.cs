
using AutoMapper;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.DTOs.UserConfig;
using server.Repositories.UserConfig;

namespace backend_tests.Repository
{
    public class ConfigRepositoryTests
    {

        private readonly IMapper _mapper;

        public ConfigRepositoryTests()
        {
            var mappingConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new ConfigDTOMappingProfile());
            });
            IMapper mapper = mappingConfig.CreateMapper();
            _mapper = mapper;
        }

        private async Task<AppDbContext> GetDbContext()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: "Test")
                .Options;
            var databaseContext = new AppDbContext(options);
            await databaseContext.Database.EnsureCreatedAsync();

            return databaseContext;
        }


        [Fact]
        public async Task GetConfig_ValidConfig_ReturnsConfig()
        {
            // Arrange
            using var context = await GetDbContext();
            var configRepository = new ConfigRepository(context, _mapper);

            var createConfigDTO = new CreateConfigDTO
            {
                UserId = Guid.NewGuid().ToString(),
                MonthlyExpenses = 1000,
                Months = 3,
            };

            var createdConfig = await configRepository.CreateConfig(createConfigDTO);

            // Act

            var result = await configRepository.GetConfig(createConfigDTO.UserId);

            // Assert

            result.Should().NotBeNull();
            result.UserId.Should().Be(createConfigDTO.UserId);
            result.MonthlyExpenses.Should().Be(createConfigDTO.MonthlyExpenses);
            result.Months.Should().Be(createConfigDTO.Months);
            result.Should().BeEquivalentTo(createConfigDTO);
            result.Should().BeOfType<GetConfigDTO>();


        }

        [Fact]
        public async Task GetConfig_ConfigDoesNotExist_ThrowsException()
        {
            // Arrange

            using var context = await GetDbContext();
            var configRepository = new ConfigRepository(context, _mapper);

            var createConfigDTO = new CreateConfigDTO
            {
                UserId = Guid.NewGuid().ToString(),
                MonthlyExpenses = 1000,
                Months = 3,
            };

            // Act

            Func<Task> action = async () => await configRepository.GetConfig(createConfigDTO.UserId);

            // Assert

            await action.Should().ThrowAsync<KeyNotFoundException>();

        }


        [Fact]
        public async Task CreateConfig_ValidConfig_ReturnsTrue()
        {
            // Arrange

            using var context = await GetDbContext();
            var configRepository = new ConfigRepository(context, _mapper);

            var createConfigDTO = new CreateConfigDTO
            {
                UserId = Guid.NewGuid().ToString(),
                MonthlyExpenses = 1000,
                Months = 3,
            };

            // Act

            var result = await configRepository.CreateConfig(createConfigDTO);


            // Assert

            result.Should().BeTrue();

        }

        [Fact]
        public async Task CreateConfig_ConfigAlreadyExists_ThrowsException()
        {
            // Arrange
            using var context = await GetDbContext();
            var configRepository = new ConfigRepository(context, _mapper);

            var createConfigDTO = new CreateConfigDTO
            {
                UserId = Guid.NewGuid().ToString(),
                MonthlyExpenses = 1000,
                Months = 3,
            };

            var createdConfig = await configRepository.CreateConfig(createConfigDTO);

            // Act

            Func<Task> action = async () => await configRepository.CreateConfig(createConfigDTO);


            // Assert

            await action.Should().ThrowAsync<InvalidOperationException>();

        }

        [Fact]
        public async Task UpdateConfig_ValidConfigDTO_ReturnsConfigDTO()
        {
            // Arrange

            using var context = await GetDbContext();
            var configRepository = new ConfigRepository(context, _mapper);

            var createConfigDTO = new CreateConfigDTO
            {
                UserId = Guid.NewGuid().ToString(),
                MonthlyExpenses = 1000,
                Months = 3,
            };

            await configRepository.CreateConfig(createConfigDTO);

            var createdConfig = context.Config.FirstOrDefault(c => c.UserId == createConfigDTO.UserId);

            var updateConfigDTO = new ConfigDTO
            {
                Id = createdConfig!.Id,
                UserId = createConfigDTO.UserId,
                MonthlyExpenses = 2000,
                Months = 4,
            };

            context.Entry(createdConfig).State = EntityState.Detached;

            // Act

            var result = await configRepository.UpdateConfig(updateConfigDTO);

            // Assert

            result.Should().BeOfType<ConfigDTO>();
            result.Should().NotBeNull();

        }


    }
}
