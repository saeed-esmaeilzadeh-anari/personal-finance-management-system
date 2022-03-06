import { PrismaClient } from "@prisma/client";
import { SearchExpenseParams } from "./ExpenseModel";
import FinanceReportService from "../FinanceReport/FinanceReportService";
import { Exception } from "../Exception";

const prisma = new PrismaClient();
const financeReportService = new FinanceReportService();
export default class ExpenseService {
  async getExpenses(userId) {
    const expense = await prisma.expense.findMany({
      where: {
        userId,
      },
    });
    return expense;
  }

  async getExpense(id: number) {
    const expense = await prisma.expense.findFirst({ where: { id } });
    return expense;
  }

  async addExpense(data: any) {
    const expense = await prisma.expense.create({ data });
    await financeReportService.addExpenseFinanceReport({
      amount: expense.amount,
      createdAt: expense.createdAt,
      name: expense.name,
      note: expense.note,
      userId: expense.userId,
      expenseId: expense.id,
      incomeId: 0,
      investmentId: 0,
    });

    return expense;
  }

  async updateExpense(id: number, data: any) {
    let oldexpense = await prisma.expense.findFirst({ where: { id } });
    if (!oldexpense) {
      return new Error("Expense not found");
    }
    const expense = await prisma.expense.update({ where: { id }, data });
    return expense;
  }

  async deleteExpense(id: number) {
    let oldexpense = await prisma.expense.findFirst({ where: { id } });
    if (!oldexpense) {
      return new Error("Expense not found");
    }
    const expense = await prisma.expense.delete({ where: { id } });
    await financeReportService.deleteExpenseFinanceReport(id);
    return expense;
  }

  async searchExpenses(data: SearchExpenseParams) {
    return new Promise(async (resolve, reject) => {
      const { name, batchSize, order, pageNumber, sortColumn, userId } = data;
      let total = 0;
      try {
        total = await prisma.expense.count({
          where: {
            userId,
          },
        });
      } catch (error) {
        reject(error);
      }
      try {
        const expense = await prisma.expense.findMany({
          where: {
            name: { contains: name },
            userId: data.userId,
          },
          orderBy: {
            [sortColumn]: order,
          },
          skip: batchSize * pageNumber,
          take: batchSize,
        });
        resolve({ data: expense, totalItems: total });
      } catch (error) {
        reject(error);
      }
    });
  }
}
