namespace server.Pagination;

public class QueryParameters
{
    const int maxPageSize = 20;
    public int PageNumber { get; set; } = 1;

    private int _pageSize = maxPageSize;

    public int PageSize
    {
        get => _pageSize;
        set => _pageSize = (value > maxPageSize) ? maxPageSize : value;
    }
}
