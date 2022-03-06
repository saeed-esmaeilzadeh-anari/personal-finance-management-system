import { PrismaClient } from "@prisma/client";
import { Exception } from "../Exception";
import FinanceReportService from "../FinanceReport/FinanceReportService";

const prisma = new PrismaClient();
const financeReportService = new FinanceReportService();

export default class InvestmentService {
  async getInvestments(userId) {
    const investment = await prisma.investments.findMany({
      where: {
        userId,
      },
    });
    return investment;
  }

  async getInvestment(id) {
    const investment = await prisma.investments.findFirst({ where: { id } });
    return investment;
  }

  async addInvestment(data) {
    const investment = await prisma.investments.create({ data });
    await financeReportService.addInvestmentFinanceReport({
      amount: investment.amount,
      createdAt: investment.createdAt,
      name: investment.name,
      note: investment.note,
      userId: investment.userId,
      investmentId: investment.id,
      expenseId: 0,
      incomeId: 0,
    });
    return investment;
  }

  async updateInvestment(id, data) {
    let oldinvestment = await prisma.investments.findFirst({ where: { id } });
    if (!oldinvestment) {
      return new Error("Investment not found");
    }
    const investment = await prisma.investments.update({ where: { id }, data });
    return investment;
  }

  async deleteInvestment(id) {
    let oldinvestment = await prisma.investments.findFirst({ where: { id } });
    if (!oldinvestment) {
      return new Error("Investment not found");
    }
    await financeReportService.deleteInvestmentFinanceReport(id);
    const investment = await prisma.investments.delete({ where: { id } });
    return investment;
  }

  async searchInvestments(data) {
    const { name, batchSize, order, pageNumber, sortColumn, userId } = data;
    let total = 0;
    try {
      total = await prisma.investments.count({
        where: {
          userId,
        },
      });
    } catch (error) {
      return new Exception("error", 500, error);
    }
    try {
      const investment = await prisma.investments.findMany({
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
      return { data: investment, totalItems: total };
    } catch (error) {
      return new Exception("error", 500, error);
    }
  }
}
