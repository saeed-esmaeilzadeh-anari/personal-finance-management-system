import express, { Request, Response, Router } from "express";
import UserRouter from "./components/User/User";
import IncomeRouter from "./components/Income/Income";
import AuthRouter from "./components/Auth/Auth";

const router: Router = express.Router();

router.use("/", IncomeRouter);
router.use("/", UserRouter);
router.use("/", AuthRouter);

export default router;
