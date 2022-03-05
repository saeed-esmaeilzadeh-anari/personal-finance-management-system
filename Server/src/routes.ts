import express, { Request, Response, Router } from "express";
import UserRouter from "./components/User/User";
import IncomeRouter from "./components/Income/Income";
import AuthRouter from "./components/Auth/Auth";
import ExpenseRouter from "./components/Expense/Expense";

const router: Router = express.Router();

router.use("/", IncomeRouter);
router.use("/", ExpenseRouter);
router.use("/", UserRouter);
router.use("/", AuthRouter);

export default router;
