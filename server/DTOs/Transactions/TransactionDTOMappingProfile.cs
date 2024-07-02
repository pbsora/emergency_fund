using AutoMapper;
using server.Model;

namespace server.DTOs.Transactions
{
    public class TransactionDTOMappingProfile : Profile
    {
        public TransactionDTOMappingProfile()
        {
            CreateMap<Transaction, NewTransactionDTO>().ReverseMap();
            CreateMap<Transaction, TransactionDTO>().ReverseMap();
        }
    }
}
