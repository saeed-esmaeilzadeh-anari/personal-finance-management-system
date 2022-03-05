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
    return prisma.user.findMany({
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

  addUser(data: any) {
    return prisma.user.create({ data });
  }

  updateUser(id: number, data: any) {
    return prisma.user.update({ where: { id }, data });
  }

  deleteUser(id: number) {
    return prisma.user.delete({ where: { id } });
  }
}
