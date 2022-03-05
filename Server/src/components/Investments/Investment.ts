import express, { Request, Response, Router } from "express";
import Auth from "../../middleware/Auth";
import InvestmentService from "./InvestmentService";
import { Exception } from "../Exception";
import { SearchInvestmentParams } from "./InvestmentModel";

const InvestmentRouter: Router = express.Router();
const investmentService = new InvestmentService();

/* get all  */
InvestmentRouter.get(
  "/investment",
  Auth,
  (req: Request, res: Response): void => {
    try {
      let userId = req.userId;
      console.log(userId);
      investmentService
        .getInvestments(userId)
        .then((investments) => {
          if (investments.length) {
            res.json(investments);
            return;
          }

          const err = new Exception("error in get Investment ", 404, {
            message: "No Investment Data found",
            stack: "No Investment Data found",
          });
          res.status(404).send(err.send());
        })
        .catch((error) => {
          const err = new Exception("error in get Investment ", 500, error);
          res.status(500).send(err.send());
        });
    } catch (error) {
      const err = new Exception("error in get Investment ", 500, error);
      res.status(500).send(err.send());
    }
  }
);
/* get one  */
InvestmentRouter.get(
  "/investment/:id",
  Auth,
  (req: Request, res: Response): void => {
    try {
      const id = parseInt(req.params.id);
      investmentService
        .getInvestment(id)
        .then((investment) => {
          if (investment) {
            res.json(investment);
            return;
          }
          const err = new Exception("error in get Investment ", 404, {
            message: "No Investment Data found",
            stack: "No Investment Data found",
          });

          res.status(404).send(err.send());
        })
        .catch((error) => {
          const err = new Exception("error in get Investment ", 500, error);
          res.status(500).send(err.send());
        });
    } catch (error) {
      const err = new Exception("error in get Investment ", 500, error);
      res.status(500).send(err.send());
    }
  }
);
/* search  */
InvestmentRouter.get(
  "/searchInvestment",
  Auth,
  (req: Request, res: Response): void => {
    try {
      let userId = req.userId;
      let data = new SearchInvestmentParams(req.query);
      data.userId = userId;
      investmentService

        .searchInvestments(data)
        .then((investment) => {
          if (investment) {
            res.json(investment);
            return;
          }

          const err = new Exception("error in get Investment ", 404, {
            message: "No Investment Data found",

            stack: "No Investment Data found",
          });

          res.status(404).send(err.send());
        })
        .catch((error) => {
          const err = new Exception("error in get Investment ", 500, error);
          res.status(500).send(err.send());
        });
    } catch (error) {
      const err = new Exception("error in get Investment ", 500, error);
      res.status(500).send(err.send());
    }
  }
);

/* add */
InvestmentRouter.post(
  "/investment",
  Auth,
  (req: Request, res: Response): void => {
    try {
      const investment = req.body;
      investmentService
        .addInvestment(investment)
        .then((newInvestment) => {
          if (newInvestment) {
            res.json(newInvestment);
            return;
          }
          const err = new Exception("error in add Investment ", 404, {
            message: "No Investment Data found",
            stack: "No Investment Data found",
          });

          res.status(404).send(err.send());
        })
        .catch((error) => {
          const err = new Exception("error in add Investment ", 500, error);
          res.status(500).send(err.send());
        });
    } catch (error) {
      const err = new Exception("error in add Investment ", 500, error);
      res.status(500).send(err.send());
    }
  }
);
/* update */
InvestmentRouter.put(
  "/investment/:id",
  Auth,
  (req: Request, res: Response): void => {
    try {
      const id = parseInt(req.params.id);
      const investment = req.body;
      investmentService
        .updateInvestment(id, investment)
        .then((updatedInvestment) => {
          if (updatedInvestment) {
            res.json(updatedInvestment);
            return;
          }
          const err = new Exception("error in update Investment ", 404, {
            message: "No Investment Data found",
            stack: "No Investment Data found",
          });

          res.status(404).send(err.send());
        })
        .catch((error) => {
          const err = new Exception("error in update Investment ", 500, error);
          res.status(500).send(err.send());
        });
    } catch (error) {
      const err = new Exception("error in update Investment ", 500, error);
      res.status(500).send(err.send());
    }
  }
);
/* delete */
InvestmentRouter.delete(
  "/investment/:id",
  Auth,
  (req: Request, res: Response): void => {
    try {
      const id = parseInt(req.params.id);
      investmentService
        .deleteInvestment(id)
        .then((deletedInvestment) => {
          if (deletedInvestment) {
            res.json(deletedInvestment);
            return;
          }
          const err = new Exception("error in delete Investment ", 404, {
            message: "No Investment Data found",
            stack: "No Investment Data found",
          });

          res.status(404).send(err.send());
        })
        .catch((error) => {
          const err = new Exception("error in delete Investment ", 500, error);
          res.status(500).send(err.send());
        });
    } catch (error) {
      const err = new Exception("error in delete Investment ", 500, error);
      res.status(500).send(err.send());
    }
  }
);

export default InvestmentRouter;
