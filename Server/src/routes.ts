import express, { Request, Response, Router } from "express";
import UserRouter from "./components/User/User";
import IncomeRouter from "./components/Income/Income";

const router: Router = express.Router();

router.use("/", IncomeRouter);
router.use("/", UserRouter);

export default router;
