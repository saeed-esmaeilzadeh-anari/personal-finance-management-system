export class SearchPaginationParams {
  name?: string = "";
  batchSize?: number = 10;
  order?: "ASC" | "DESC" = "DESC";
  pageNumber?: number = 0;
  sortColumn?: string = "created_at";
  total: number = 0;
}
