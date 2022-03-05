import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default class UserService {
  getUsers() {
    return prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        updatedAt: true,
        createdAt: true,
      },
    });
  }

  getUser(id: number) {
    return prisma.user.findFirst({
      select: {
        id: true,
        name: true,
        email: true,
        updatedAt: true,
        createdAt: true,
      },
      where: { id },
    });
  }
  getUserByEmail(email: string) {
    return prisma.user.findFirst({
      where: { email },
    });
  }

  addUser(data: any) {
    return prisma.user.create({ data });
  }

  async updateUser(id: number, data: any) {
    let user = await this.getUser(id);
    if (!user) {
      throw new Error("User not found");
    }
    return prisma.user.update({ where: { id }, data });
  }

  async deleteUser(id: number) {
    let user = await this.getUser(id);
    if (!user) {
      throw new Error("User not found");
    }

    return prisma.user.delete({ where: { id } });
  }
}
