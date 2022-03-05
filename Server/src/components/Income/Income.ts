import express, { Request, Response, Router } from "express";
import { Exception } from "../../Exception";
import IncomeService from "./IncomeService";

const IncomeRouter: Router = express.Router();
const incomeService = new IncomeService();

IncomeRouter.get("/income", (req: Request, res: Response): void => {
  try {
    incomeService.getIncomes().then((incomes) => {
      if (incomes.length) {
        res.json(incomes);
      }
      const error = new Exception(404, "Income not found");

      res.status(404).send(error.send());
    });
  } catch (error) {
    res.status(500).send(error);
  }
});
IncomeRouter.get("/income/:id", (req: Request, res: Response): void => {
  try {
    const id = parseInt(req.params.id);
    incomeService.getIncome(id).then((income) => {
      if (income.length) {
        res.json(income[0]);
      }
      const error = new Exception(404, "Income not found");

      res.status(404).send(error.send());
    });
  } catch (error) {
    const err = new Exception(404, error);

    res.status(500).send(err.send());
  }
});
IncomeRouter.get("/searchIncomes", (req: Request, res: Response): void => {
  try {
    incomeService.searchIncomes(req.query).then((incomes) => {
      res.json(incomes);
    });
  } catch (error) {
    res.status(500).send(error);
  }
});
IncomeRouter.post("/income", (req: Request, res: Response): void => {
  try {
    incomeService.addIncome(req.body).then((income) => {
      res.json(income);
    });
  } catch (error) {
    res.status(500).send(error);
  }
});
IncomeRouter.put("/income/:id", (req: Request, res: Response): void => {
  try {
    incomeService.updateIncome(req.params.id, req.body).then((income) => {
      res.json(income);
    });
  } catch (error) {
    res.status(500).send(error);
  }
});
IncomeRouter.delete("/income/:id", (req: Request, res: Response): void => {
  try {
    incomeService.deleteIncome(req.params.id).then((income) => {
      res.json(income);
    });
  } catch (error) {
    res.status(500).send(error);
  }
});
export default IncomeRouter;
