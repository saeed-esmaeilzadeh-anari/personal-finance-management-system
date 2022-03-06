import { PrismaClient } from "@prisma/client";
import { SearchExpenseParams } from "./ExpenseModel";
const prisma = new PrismaClient();
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
    return expense;
  }

  async updateExpense(id: number, data: any) {
    let oldexpense = await prisma.expense.findFirst({ where: { id } });
    if (!oldexpense) {
      throw new Error("Expense not found");
    }
    const expense = await prisma.expense.update({ where: { id }, data });
    return expense;
  }

  async deleteExpense(id: number) {
    const expense = await prisma.expense.delete({ where: { id } });
    return expense;
  }

  async searchExpenses(data: SearchExpenseParams) {
    const { name, batchSize, order, pageNumber, sortColumn, userId } = data;
    let total = 0;
    try {
      total = await prisma.expense.count({
        where: {
          userId,
        },
      });
    } catch (error) {
      throw new Error(error);
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
      return { data: expense, totalItems: total };
    } catch (error) {
      throw new Error(error);
    }
  }
}
