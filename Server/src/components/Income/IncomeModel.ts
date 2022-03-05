export interface IncomeModel {
  id: number;
  name: string;
  note: string;
  receivedFrom: string;
  type: string;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
}
export interface IncomePostModel {
  name: string;
  note: string;
  receivedFrom: string;
  type: string;
  amount: number;
  userId: number;
}
export interface IncomePutModel {
  name: string;
  note: string;
  receivedFrom: string;
  type: string;
  amount: number;
  updatedAt: Date;
  userId: number;
}
export class SearchIncomeParams {
  name?: string = "";
  batchSize?: number = 10;
  order?: "ASC" | "DESC" = "DESC";
  pageNumber?: number = 0;
  sortColumn?: string = "created_at";
  total: number = 0;
}
