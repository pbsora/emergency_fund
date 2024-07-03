namespace server.Pagination;

public class QueryParameters
{
    const int maxPageSize = 20;
    public int Page { get; set; } = 1;

    private int _limit = maxPageSize;

    public int Limit
    {
        get => _limit;
        set => _limit = (value > maxPageSize) ? maxPageSize : value;
    }
}
