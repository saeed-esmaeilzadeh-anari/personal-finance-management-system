import express, { Request, Response, Router } from "express";
import UserService from "./UserServer";
import { Exception } from "../../Exception";
import { UserPostModel, UserPutModel } from "./UserModel";

const UserRouter: Router = express.Router();
const userService = new UserService();

UserRouter.get("/users", (req: Request, res: Response): void => {
  try {
    userService
      .getUsers()
      .then((users) => {
        if (users.length) {
          res.json(users);
          return;
        }
        const error = new Exception(404, "User not found");

        res.status(404).send(error.send());
      })
      .catch((error) => {
        const err = new Exception(500, error);
        res.status(500).send(err.send());
      });
  } catch (error) {
    const err = new Exception(500, error);
    res.status(500).send(err.send());
  }
});

UserRouter.get("/user/:id", (req: Request, res: Response): void => {
  try {
    const id = parseInt(req.params.id);
    userService
      .getUser(id)
      .then((user) => {
        if (user.length) {
          res.json(user[0]);
          return;
        }
        const error = new Exception(404, "User not found");
        res.status(404).send(error.send());
      })
      .catch((error) => {
        const err = new Exception(500, error);
        res.status(500).send(err.send());
      });
  } catch (error) {
    const err = new Exception(500, error);
    res.status(500).send(err.send());
  }
});

UserRouter.post("/user", (req: Request, res: Response): void => {
  try {
    let data: UserPostModel = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };
    userService
      .addUser(req.body)
      .then((user) => {
        res.json(user);
        return;
      })
      .catch((error) => {
        const err = new Exception(500, error);
        res.status(500).send(err.send());
      });
  } catch (error) {
    const err = new Exception(500, error);
    res.status(500).send(err.send());
  }
});

UserRouter.put("/user/:id", (req: Request, res: Response): void => {
  try {
    let id = parseInt(req.params.id);
    let data: UserPutModel = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      updatedAt: new Date(),
    };
    console.log(data);
    userService
      .updateUser(id, data)
      .then((user) => {
        res.json(user);
        return;
      })
      .catch((error) => {
        const err = new Exception(500, error);
        res.status(500).send(err.send());
      });
  } catch (error) {
    const err = new Exception(500, error);
    res.status(500).send(err.send());
  }
});

UserRouter.delete("/user/:id", (req: Request, res: Response): void => {
  console.log(req.params.id);
  try {
    let id = parseInt(req.params.id);

    userService
      .getUser(id)
      .then((user) => {
        if (user.length) {
          userService
            .deleteUser(id)
            .then((user) => {
              res.json(user);
              return;
            })
            .catch((error) => {
              const err = new Exception(500, error);
              res.status(500).send(err.send());
            });
        } else {
          const error = new Exception(404, "User not found");
          res.status(404).send(error.send());
        }
      })
      .catch((error) => {
        const err = new Exception(500, error);
        res.status(500).send(err.send());
      });
  } catch (error) {
    const err = new Exception(500, error);
    res.status(500).send(err.send());
  }
});

export default UserRouter;
