import express, { Request, Response, Router } from "express";
import Auth from "../../middleware/Auth";
import { Exception } from "../Exception";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const MyBalanceRoute: Router = express.Router();

MyBalanceRoute.get("/mybalance", Auth, async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    let totalIncome = await prisma.income.aggregate({
      where: {
        userId,
      },
      _sum: {
        amount: true,
      },
      _count: {
        amount: true,
      },
    });

    let totalExpense = await prisma.expense.aggregate({
      where: {
        userId,
      },
      _sum: {
        amount: true,
      },
      _count: {
        amount: true,
      },
    });

    let totalInvestment = await prisma.investments.aggregate({
      where: {
        userId,
      },
      _sum: {
        amount: true,
      },
      _count: {
        amount: true,
      },
    });
    let data = {
      totalIncome: {
        amount: totalIncome._sum.amount || 0,
        count: totalIncome._count.amount || 0,
      },
      totalExpense: {
        amount: totalExpense._sum.amount || 0,
        count: totalExpense._count.amount || 0,
      },
      totalInvestment: {
        amount: totalInvestment._sum.amount || 0,
        count: totalInvestment._count.amount || 0,
      },
      Balance: {
        amount: totalIncome._sum.amount - totalExpense._sum.amount || 0,
        count: 1,
      },
    };
    res.json(data);
  } catch (error) {
    const err = new Exception("error in get Finance ", 500, error);
    res.status(500).send(err.send());
  }
});

export default MyBalanceRoute;
