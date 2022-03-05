import { IncomeModel } from "./IncomeModel";

export default class IncomeRepository {
  id: number;
  name: string;
  note: string;
  receivedFrom: string;
  type: string;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  constructor({
    name,
    note,
    receivedFrom,
    type,
    amount,

    userId,
  }: IncomeModel) {
    this.name = name;
    this.note = note;
    this.receivedFrom = receivedFrom;
    this.type = type;
    this.amount = amount;

    this.userId = userId;
  }
}
