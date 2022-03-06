import { PrismaClient } from "@prisma/client";
import {
  SearchReportParams,
  FinanceAddReport,
  Type,
  FinancePutReport,
} from "./FinanceReportModel";
import { Exception } from "../Exception";

const prisma = new PrismaClient();

export default class FinanceReportService {
  async getFinanceReports(userId) {
    const report = await prisma.financeReport.findMany({
      where: {
        userId,
      },
    });
    return report;
  }

  async getFinanceReport(id: number) {
    const report = await prisma.financeReport.findFirst({ where: { id } });
    return report;
  }

  private async addFinanceReport(data: any) {
    const report = await prisma.financeReport.create({ data });
    return report;
  }

  async addIncomeFinanceReport(data: FinanceAddReport) {
    let income: FinanceAddReport = {
      ...data,
      type: Type.Income,
    };
    const report = await this.addFinanceReport(income);
    return report;
  }
  async addExpenseFinanceReport(data: FinanceAddReport) {
    let income: FinanceAddReport = {
      ...data,
      type: Type.Expense,
    };
    const report = await this.addFinanceReport(income);
    return report;
  }
  async addInvestmentFinanceReport(data: FinanceAddReport) {
    let income: FinanceAddReport = {
      ...data,
      type: Type.Investment,
    };
    const report = await this.addFinanceReport(income);
    return report;
  }

  async updateFinanceReport(id: number, data: any) {
    let putData: FinancePutReport = {
      amount: data.amount,
      name: data.name,
      note: data.note,
    };
    const report = await prisma.financeReport.update({
      where: { id },
      data: putData,
    });
    return report;
  }

  async deleteIncomeFinanceReport(id: number) {
    const report = await prisma.financeReport.findFirst({
      where: { incomeId: id },
    });
    if (report) {
      await prisma.financeReport.delete({ where: { id: report.id } });
    }
    return report;
  }
  async deleteExpenseFinanceReport(id: number) {
    const report = await prisma.financeReport.findFirst({
      where: { expenseId: id },
    });
    if (report) {
      await prisma.financeReport.delete({ where: { id: report.id } });
    }
    return report;
  }
  async deleteInvestmentFinanceReport(id: number) {
    const report = await prisma.financeReport.findFirst({
      where: { investmentId: id },
    });
    if (report) {
      await prisma.financeReport.delete({ where: { id: report.id } });
    }
    return report;
  }
  async deleteFinanceReport(id: number) {
    const report = await prisma.financeReport.delete({ where: { id } });
    return report;
  }

  async searchFinanceReport(data: SearchReportParams) {
    const { name, batchSize, order, pageNumber, sortColumn, userId } = data;
    let total = 0;
    try {
      total = await prisma.financeReport.count({
        where: {
          userId,
        },
      });
    } catch (error) {
      return new Exception("error", 500, error);
    }

    try {
      const report = await prisma.financeReport.findMany({
        where: {
          name: { contains: name },
          userId: data.userId,
          type: data.type,
        },
        orderBy: {
          [sortColumn]: order,
        },
        skip: batchSize * pageNumber,
        take: batchSize,
      });
      return report;
    } catch (error) {
      return new Exception("error", 500, error);
    }
  }
}
