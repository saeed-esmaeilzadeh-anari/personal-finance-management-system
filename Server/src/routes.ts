import express, { Request, Response, Router } from "express";
import UserRouter from "./components/User/User";
import IncomeRouter from "./components/Income/Income";
import AuthRouter from "./components/Auth/Auth";
import ExpenseRouter from "./components/Expense/Expense";
import InvestmentRouter from "./components/Investments/Investment";
import FinanceRouter from "./components/FinanceReport/FinanceReport";
import MyBalanceRoute from "./components/MyBalance/MyBalance";

const router: Router = express.Router();

router.use("/", IncomeRouter);
router.use("/", ExpenseRouter);
router.use("/", InvestmentRouter);
router.use("/", UserRouter);
router.use("/", FinanceRouter);
router.use("/", AuthRouter);
router.use("/", MyBalanceRoute);

export default router;
