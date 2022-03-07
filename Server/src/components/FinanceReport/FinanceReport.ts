import express, { Request, Response, Router } from "express";
import { Exception } from "../Exception";
import Auth from "../../middleware/Auth";
import FinanceReportService from "./FinanceReportService";
import { SearchReportParams, Type } from "./FinanceReportModel";

const FinanceRouter: Router = express.Router();
const financeReportService = new FinanceReportService();

/* get all */
FinanceRouter.get("/finance", Auth, (req: Request, res: Response): void => {
  try {
    const userId = req.userId;
    financeReportService
      .getFinanceReports(userId)
      .then((financeReports) => {
        console.log(financeReports);
        if (financeReports.length) {
          res.json(financeReports);
          return;
        }

        const err = new Exception("error in get FinanceReport ", 404, {
          message: "No FinanceReport Data found",
          stack: "No FinanceReport Data found",
        });
        res.status(404).send(err.send());
      })
      .catch((error) => {
        const err = new Exception("error in get FinanceReport ", 500, error);
        res.status(500).send(err.send());
      });
  } catch (error) {
    const err = new Exception("error in get FinanceReport ", 500, error);
    res.status(500).send(err.send());
  }
});

/* Search   */
FinanceRouter.get(
  "/finance/report",
  Auth,
  (req: Request, res: Response): void => {
    try {
      const userId = req.userId;
      let searchParams: SearchReportParams = {
        type:
          req.query.type.toLowerCase() === "income"
            ? Type.Income
            : req.query.type.toLowerCase() === "expense"
            ? Type.Expense
            : req.query.type.toLowerCase() === "investment"
            ? Type.Investment
            : null,
        userId: userId,
        name: req.query?.name,
        batchSize: parseInt(req.query.batchSize),
        order: req.query.order,
        pageNumber: parseInt(req.query.pageNumber),
        sortColumn: req.query.sortColumn,
        fromDate: req.query?.fromDate,
        toDate: req.query?.toDate,
      };
      financeReportService
        .searchFinanceReport(searchParams)
        .then((finance) => {
          if (finance) {
            res.json(finance);
            return;
          }
          const err = new Exception("error in get Finance ", 404, {
            message: "No Finance Data found",
            stack: "No Finance Data found",
          });
          res.status(404).send(err.send());
        })
        .catch((error) => {
          const err = new Exception("error in get Finance ", 500, error);
          res.status(500).send(err.send());
        });
    } catch (error) {
      const err = new Exception("error in get Finance ", 500, error);
      res.status(500).send(err.send());
    }
  }
);
export default FinanceRouter;
