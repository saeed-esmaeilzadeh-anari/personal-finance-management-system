import { PrismaClient } from "@prisma/client";
import { SearchIncomeParams } from "./IncomeModel";
import IncomeRepository from "./IncomeRepository";
const prisma = new PrismaClient();

export default class IncomeService {
  async getIncomes() {
    return await prisma.income.findMany();
  }

  async getIncome(id: number) {
    return await prisma.income.findMany({ where: { id } });
  }

  async addIncome(data: any) {
    const incomeRepository = new IncomeRepository(data);
    return await prisma.income.create({ data: incomeRepository });
  }

  async updateIncome(id: number, data: any) {
    return await prisma.income.update({ where: { id }, data });
  }

  async deleteIncome(id: number) {
    return await prisma.income.delete({ where: { id } });
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
    return await prisma.income.findMany({
      where: {
        name: { contains: name },
      },
      orderBy: {
        [sortColumn]: order,
      },
      skip: batchSize * pageNumber,
      take: batchSize,
    });
  }
}
