import express, { Request, Response, Router } from "express";
import UserService from "./UserServer";
import { Exception } from "../Exception";
import { UserPostModel, UserPutModel } from "./UserModel";
import Auth from "../../middleware/Auth";

const UserRouter: Router = express.Router();
const userService = new UserService();

UserRouter.get("/users", Auth, (req: Request, res: Response): void => {
  try {
    userService
      .getUsers()
      .then((users) => {
        if (users.length) {
          res.json(users);
          return;
        }
        const err = new Exception("error in get user ", 404, "User not found");

        res.status(404).send(err.send());
      })
      .catch((error) => {
        const err = new Exception("error in get user ", 500, error);

        res.status(500).send(err.send());
      });
  } catch (error) {
    const err = new Exception("error in get user ", 500, error);
    res.status(500).send(err.send());
  }
});

UserRouter.get("/user/:id", Auth, (req: Request, res: Response): void => {
  try {
    const id = parseInt(req.params.id);
    userService
      .getUser(id)
      .then((user) => {
        if (user) {
          res.json(user);
          return;
        }
        const err = new Exception("error in get user ", 404, "User not found");
        res.status(404).send(err.send());
      })
      .catch((error) => {
        const err = new Exception("error in get user ", 500, error);
        res.status(500).send(err.send());
      });
  } catch (error) {
    const err = new Exception("error in get user ", 500, error);
    res.status(500).send(err.send());
  }
});

UserRouter.put("/user/:id", Auth, (req: Request, res: Response): void => {
  try {
    let id = parseInt(req.params.id);
    let data: UserPutModel = {
      name: req.body.name,
      email: req.body.email,
      updatedAt: new Date(),
    };
    userService
      .updateUser(id, data)
      .then((user) => {
        res.json(user);
        return;
      })
      .catch((error) => {
        const err = new Exception("error in update user ", 500, error);
        res.status(500).send(err.send());
      });
  } catch (error) {
    const err = new Exception("error in update user ", 500, error);
    res.status(500).send(err.send());
  }
});

UserRouter.delete("/user/:id", Auth, (req: Request, res: Response): void => {
  try {
    const id = parseInt(req.params.id);
    userService
      .deleteUser(id)
      .then((user) => {
        res.json(user);
        return;
      })
      .catch((error) => {
        const err = new Exception("error in update user ", 500, error);
        res.status(500).send(err.send());
      });
  } catch (error) {
    const err = new Exception("error in delete user ", 500, error);
    res.status(500).send(err.send());
  }
});

export default UserRouter;
