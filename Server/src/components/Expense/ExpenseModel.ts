export interface ExpenseModel {
  id: number;
  name: string;
  note: string;
  type: string;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
}
export interface ExpensePostModel {
  name: string;
  note: string;
  type: string;
  amount: number;
  userId: number;
}
export interface ExpensePutModel {
  name: string;
  note: string;
  type: string;
  amount: number;
  updatedAt: Date;
  userId: number;
}

export class SearchExpenseParams {
  userId: number;
  name?: string = "";
  batchSize?: number = 10;
  order?: "asc" | "desc" = "desc";
  pageNumber?: number = 0;
  sortColumn?: string = "created_at";
  total: number = 1;
  constructor(params) {
    if (params) {
      this.userId = params.userId;
      this.name = params.name;
      this.batchSize = parseInt(params.batchSize) || 10;
      this.order = params.order;
      this.pageNumber = parseInt(params.pageNumber) || 0;
      this.sortColumn = params.sortColumn;
    }
  }
}
