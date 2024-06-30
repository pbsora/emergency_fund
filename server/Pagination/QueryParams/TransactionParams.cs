namespace server.Pagination.QueryParams;

public class TransactionParams : QueryParameters
{
    public double Amount { get; set; }
    public string Criteria { get; set; } = string.Empty; //gt or lt
    public int Month { get; set; }
    public int Year { get; set; }
}
