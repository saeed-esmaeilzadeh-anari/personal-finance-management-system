export class SearchPaginationParams {
  name?: string = '';
  batchSize?: number = 10;
  order?: 'asc' | 'desc' = 'desc';
  pageNumber?: number = 0;
  sortColumn?: string = 'createdAt';
  type: string = 'All';
  fromDate?: string = '';
  toDate?: string = '';
  total: number = 0;
}
