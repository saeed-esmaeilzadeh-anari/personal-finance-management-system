import { PrismaClient } from "@prisma/client";
import { SearchIncomeParams, IncomePostModel } from "./IncomeModel";
const prisma = new PrismaClient();

export default class IncomeService {
  async getIncomes() {
    const income = await prisma.income.findMany();
    return income;
  }

  async getIncome(id: number) {
    const income = await prisma.income.findFirst({ where: { id } });
    return income;
  }

  async addIncome(data: IncomePostModel) {
    const income = await prisma.income.create({ data });
    return income;
  }

  async updateIncome(id: number, data: any) {
    const income = await prisma.income.update({ where: { id }, data });
    return income;
  }

  async deleteIncome(id: number) {
    const income = await prisma.income.delete({ where: { id } });
    return income;
  }

  async searchIncomes(data: SearchIncomeParams) {
    const { name, batchSize, order, pageNumber, sortColumn } = data;
    const params = {
      name,
      batchSize,
      order,
      pageNumber,
      sortColumn,
    };
    const income = await prisma.income.findMany({
      where: {
        name: { contains: name },
      },
      orderBy: {
        [sortColumn]: order,
      },
      skip: batchSize * pageNumber,
      take: batchSize,
    });
    return income;
  }
}
