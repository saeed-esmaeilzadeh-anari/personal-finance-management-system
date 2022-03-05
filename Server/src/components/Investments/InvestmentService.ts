import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
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
    return investment;
  }

  async updateInvestment(id, data) {
    let oldinvestment = await prisma.investments.findFirst({ where: { id } });
    if (!oldinvestment) {
      throw new Error("Investment not found");
    }
    const investment = await prisma.investments.update({ where: { id }, data });
    return investment;
  }

  async deleteInvestment(id) {
    let oldinvestment = await prisma.investments.findFirst({ where: { id } });
    if (!oldinvestment) {
      throw new Error("Investment not found");
    }
    const investment = await prisma.investments.delete({ where: { id } });
    return investment;
  }

  async searchInvestments(data) {
    const { name, batchSize, order, pageNumber, sortColumn } = data;
    const total = await prisma.investments.count({
      where: {
        userId: data.userId,
      },
    });
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
  }
}
