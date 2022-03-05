import express, { Request, Response, Router } from "express";
import {
  IncomePostModel,
  IncomePutModel,
} from "src/components/Income/IncomeModel";
import { Exception } from "../../Exception";
import IncomeService from "./IncomeService";

const IncomeRouter: Router = express.Router();
const incomeService = new IncomeService();
/* get all  */
IncomeRouter.get("/income", (req: Request, res: Response): void => {
  try {
    incomeService
      .getIncomes()
      .then((incomes) => {
        if (incomes.length) {
          res.json(incomes);
          return;
        }
        const err = new Exception(
          "error in get Income ",
          404,
          "Income not found"
        );

        res.status(404).send(err.send());
      })
      .catch((error) => {
        const err = new Exception("error in get Income ", 500, error);
        res.status(500).send(err.send());
      });
  } catch (error) {
    const err = new Exception("error in get Income ", 500, error);
    res.status(500).send(err.send());
  }
});
/* get one  */
IncomeRouter.get("/income/:id", (req: Request, res: Response): void => {
  try {
    const id = parseInt(req.params.id);
    incomeService
      .getIncome(id)
      .then((income) => {
        if (income.length) {
          res.json(income[0]);
          return;
        }
        const err = new Exception(
          "error in get Income ",
          404,
          "Income not found"
        );

        res.status(404).send(err.send());
      })
      .catch((error) => {
        const err = new Exception("error in get Income ", 500, error);
        res.status(500).send(err.send());
      });
  } catch (error) {
    const err = new Exception("error in get Income ", 500, error);
    res.status(500).send(err.send());
  }
});
/* search  */
IncomeRouter.get("/searchIncomes", (req: Request, res: Response): void => {
  try {
    incomeService
      .searchIncomes(req.query)
      .then((incomes) => {
        res.json(incomes);
      })
      .catch((error) => {
        const err = new Exception("error in search Income ", 500, error);
        res.status(500).send(err.send());
      });
  } catch (error) {
    const err = new Exception("error in search Income ", 500, error);
    res.status(500).send(err.send());
  }
});
/* add one  */
IncomeRouter.post("/income", (req: Request, res: Response): void => {
  try {
    let data: IncomePostModel = {
      name: req.body.name,
      note: req.body.note,
      receivedFrom: req.body.receivedFrom,
      type: req.body.type,
      amount: req.body.amount,
      userId: req.body.userId,
    };
    console.log(data);
    incomeService
      .addIncome(data)
      .then((income) => {
        console.log(income);
        res.json(income);
      })
      .catch((error) => {
        const err = new Exception("error in add Income ", 500, error);
        res.status(500).send(err.send());
      });
  } catch (error) {
    const err = new Exception("error in add Income ", 500, error);
    res.status(500).send(err.send());
  }
});
/* update one  */
IncomeRouter.put("/income/:id", (req: Request, res: Response): void => {
  try {
    const id = parseInt(req.params.id);
    let data: IncomePutModel = {
      name: req.body.name,
      note: req.body.note,
      receivedFrom: req.body.receivedFrom,
      type: req.body.type,
      amount: req.body.amount,
      updatedAt: new Date(),
      userId: req.body.userId,
    };
    console.log(data);
    incomeService
      .getIncome(id)
      .then((income) => {
        if (income.length) {
          incomeService
            .updateIncome(id, data)
            .then((income) => {
              console.log(income);
              res.json(income);
            })
            .catch((error) => {
              const err = new Exception("error in update Income ", 500, error);
              res.status(500).send(err.send());
            });
        } else {
          const err = new Exception(
            "error in update Income ",
            404,
            "Income not found"
          );

          res.status(404).send(err.send());
        }
      })
      .catch((error) => {
        const err = new Exception("error in update Income ", 500, error);
        res.status(500).send(err.send());
      });
  } catch (error) {
    const err = new Exception("error in update Income ", 500, error);
    res.status(500).send(err.send());
  }
});
/* delete one  */
IncomeRouter.delete("/income/:id", (req: Request, res: Response): void => {
  try {
    const id = parseInt(req.params.id);

    incomeService
      .deleteIncome(id)
      .then((income) => {
        res.json(income);
      })
      .catch((error) => {
        // const err = new Exception(500, error.message);
        const err = new Exception("error in delete Income ", 500, error);
        res.status(500).send(err.send());
      });
  } catch (error) {
    const err = new Exception("error in delete Income ", 500, error);
    res.status(500).send(err.send());
  }
});
export default IncomeRouter;
