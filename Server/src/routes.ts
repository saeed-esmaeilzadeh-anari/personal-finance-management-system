import express, { Request, Response, Router } from "express";
import IncomeRouter from "./components/Income/Income";

const router: Router = express.Router();

router.use("/", IncomeRouter);

export default router;
