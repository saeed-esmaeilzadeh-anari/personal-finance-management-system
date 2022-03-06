import express, { Request, Response, Router } from "express";
import {
  ExpensePostModel,
  ExpensePutModel,
  SearchExpenseParams,
} from "./ExpenseModel";
import { Exception } from "../Exception";
import ExpenseService from "./ExpenseService";
import Auth from "../../middleware/Auth";

const ExpenseRouter: Router = express.Router();
const expenseService = new ExpenseService();
/* get all  */

ExpenseRouter.get("/expense", Auth, (req: Request, res: Response): void => {
  try {
    const userId = req.userId;
    expenseService
      .getExpenses(userId)
      .then((expenses) => {
        if (expenses.length) {
          res.json(expenses);
          return;
        }

        const err = new Exception("error in get Expense ", 404, {
          message: "No Expense Data found",
          stack: "No Expense Data found",
        });
        res.status(404).send(err.send());
      })
      .catch((error) => {
        const err = new Exception("error in get Expense ", 500, error);
        res.status(500).send(err.send());
      });
  } catch (error) {
    const err = new Exception("error in get Expense ", 500, error);
    res.status(500).send(err.send());
  }
});
/* get one  */

ExpenseRouter.get("/expense/:id", Auth, (req: Request, res: Response): void => {
  try {
    const id = parseInt(req.params.id);
    expenseService
      .getExpense(id)
      .then((expense) => {
        if (expense) {
          res.json(expense);
          return;
        }
        const err = new Exception("error in get Expense ", 404, {
          message: "No Expense Data found",
          stack: "No Expense Data found",
        });

        res.status(404).send(err.send());
      })
      .catch((error) => {
        const err = new Exception("error in get Expense ", 500, error);
        res.status(500).send(err.send());
      });
  } catch (error) {
    const err = new Exception("error in get Expense ", 500, error);
    res.status(500).send(err.send());
  }
});
/* search  */
ExpenseRouter.get(
  "/searchExpenses",
  Auth,
  (req: Request, res: Response): void => {
    const userId = req.userId;
    let data = new SearchExpenseParams(req.query);
    data.userId = userId;
    expenseService
      .searchExpenses(data)
      .then((expense) => {
        if (expense) {
          res.json(expense);
          return;
        }
        const err = new Exception("error in get Expense ", 404, {});
        res.json(err);
      })
      .catch((error) => {
        const err = new Exception("error in get Expense ", 500, error);
        res.status(500).send(err.send());
      });
  }
);
/* add one  */
ExpenseRouter.post("/expense", Auth, (req: Request, res: Response): void => {
  const userId = req.userId;
  let data: ExpensePostModel = {
    name: req.body.name,
    note: req.body.note,
    type: req.body.type,
    amount: req.body.amount,
    userId: userId,
  };
  expenseService
    .addExpense(data)
    .then((expense) => {
      if (expense) {
        res.json(expense);
        return;
      }
      const err = new Exception("error in get Expense ", 404, {
        message: "Expense not found",
        stack: "Expense not found",
      });

      res.status(404).send(err.send());
    })
    .catch((error) => {
      const err = new Exception("error in add Expense ", 500, error);
      res.status(500).send(err.send());
    });
});

/* update one  */
ExpenseRouter.put("/expense/:id", Auth, (req: Request, res: Response): void => {
  const id = parseInt(req.params.id);
  const userId = req.userId;

  let data: ExpensePutModel = {
    name: req.body.name,
    note: req.body.note,
    type: req.body.type,
    amount: req.body.amount,
    userId: userId,
    updatedAt: new Date(),
  };
  expenseService
    .updateExpense(id, data)
    .then((expense) => {
      if (expense) {
        res.json(expense);
        return;
      }
      const err = new Exception("error in get Expense ", 404, {
        message: "Expense not found",
        stack: "Expense not found",
      });

      res.status(404).send(err.send());
    })
    .catch((error) => {
      const err = new Exception("error in update Expense ", 500, error);

      res.status(500).send(err.send());
    });
});

/* delete one  */
ExpenseRouter.delete(
  "/expense/:id",
  Auth,
  (req: Request, res: Response): void => {
    const id = parseInt(req.params.id);
    expenseService
      .deleteExpense(id)
      .then((expense) => {
        if (expense) {
          res.json(expense);
          return;
        }
        const err = new Exception("error in get Expense ", 404, {
          message: "Expense not found",
          stack: "Expense not found",
        });
        res.status(404).send(err.send());
      })
      .catch((error) => {
        const err = new Exception("error in delete Expense ", 500, error);
        res.status(500).send(err.send());
      });
  }
);

export default ExpenseRouter;
