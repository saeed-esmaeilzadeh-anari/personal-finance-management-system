export class SearchPaginationParams {
  name?: string = '';
  batchSize?: number = 10;
  order?: 'asc' | 'desc' = 'desc';
  pageNumber?: number = 0;
  sortColumn?: string = 'createdAt';
  total: number = 0;
}
