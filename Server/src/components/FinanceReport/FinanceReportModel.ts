export enum Type {
  Income = "income",
  Expense = "expense",
  Investment = "investment",
}

export class SearchReportParams {
  userId: number;
  name?: string = "";
  batchSize?: number = 10;
  order?: "asc" | "desc" = "desc";
  pageNumber?: number = 0;
  sortColumn?: string = "created_at";
  type: Type = Type.Income;
  fromDate?: Date;
  toDate?: Date;
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

export interface FinanceReport {
  id: number;
  name: string;
  note: string;
  type: Type;
  amount: number;
  createdAt: Date;
  userId: number;
  incomeId: number;
  expenseId: number;
  investmentId: number;
}
export interface FinanceAddReport {
  name: string;
  note: string;
  type?: Type;
  amount: number;
  createdAt: Date;
  userId: number;
  incomeId?: number;
  expenseId?: number;
  investmentId?: number;
}
export interface FinancePutReport {
  name: string;
  note: string;
  amount: number;
}
