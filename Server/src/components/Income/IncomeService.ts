import { PrismaClient } from "@prisma/client";
import { Exception } from "../Exception";
import { SearchIncomeParams, IncomePostModel } from "./IncomeModel";
import FinanceReportService from "../FinanceReport/FinanceReportService";

const prisma = new PrismaClient();
const financeReportService = new FinanceReportService();

export default class IncomeService {
  async getIncomes(userId) {
    const income = await prisma.income.findMany({
      where: {
        userId,
      },
    });
    return income;
  }

  async getIncome(id: number) {
    const income = await prisma.income.findFirst({ where: { id } });
    return income;
  }

  async addIncome(data: IncomePostModel) {
    const income = await prisma.income.create({ data });
    await financeReportService.addIncomeFinanceReport({
      amount: income.amount,
      createdAt: income.createdAt,
      name: income.name,
      note: income.note,
      userId: income.userId,
      incomeId: income.id,
      expenseId: 0,
      investmentId: 0,
    });
    return income;
  }

  async updateIncome(id: number, data: any) {
    const income = await prisma.income.update({ where: { id }, data });
    return income;
  }

  async deleteIncome(id: number) {
    const income = await prisma.income.delete({ where: { id } });
    await financeReportService.deleteIncomeFinanceReport(id);
    return income;
  }

  async searchIncomes(data: SearchIncomeParams) {
    return new Promise(async (resolve, reject) => {
      const { name, batchSize, order, pageNumber, sortColumn, userId } = data;
      let total = 0;
      try {
        total = await prisma.income.count({
          where: {
            userId,
          },
        });
      } catch (error) {
        reject(error);
      }

      try {
        const income = await prisma.income.findMany({
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
        resolve({ data: income, totalItems: total });
      } catch (error) {
        reject(error);
      }
    });
  }
}
