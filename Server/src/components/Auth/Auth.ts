import express, { Request, Response, Router } from "express";
import dotenv from "dotenv";
import { Exception } from "../Exception";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserPostModel } from "../User/UserModel";
import UserService from "../User/UserServer";

dotenv.config();
const AuthRouter: Router = express.Router();
const jwtSecret = process.env.ACCESS_TOKEN_SECRET;
const prisma = new PrismaClient();
const userService = new UserService();

/**
 * @desc Authenticate user & get token
 * @access   Public
 * @route    Post api/login
 */
AuthRouter.post("/login", (req: Request, res: Response): void => {
  const email = req.body.email;
  const userpassword = req.body.password;
  try {
    userService.getUserByEmail(email).then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      console.log(user, userpassword);
      bcrypt.compare(userpassword, user.password).then((isMatch) => {
        if (isMatch) {
          jwt.sign(
            { id: user.id },
            jwtSecret,
            { expiresIn: 3600 * 365 },
            (err, token) => {
              if (err) {
                res.status(500).json({ err: err, message: "Server error" });
              }
              res.json({
                ...user,
                success: true,
                token: "Bearer " + token,
              });
            }
          );
        } else {
          return res.status(401).json({ message: "Password incorrect" });
        }
      });
    });
  } catch (error) {
    const err = new Exception("error in Login ", 500, error);
    res.status(500).send(err.send());
  }
});
/**
 *@route    Post api/signup
 *@desc     signup New User
 *@access   Public
 */

AuthRouter.post(
  "/signup",
  async (req: Request, res: Response): Promise<void> => {
    try {
      let data: UserPostModel = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      };
      userService
        .getUserByEmail(data.email)
        .then(async (user) => {
          if (user) {
            return res.status(401).json({ message: "User already exists" });
          } else {
            const salt = await bcrypt.genSalt(10);
            data.password = await bcrypt.hash(data.password, salt);
            userService
              .addUser(data)
              .then((user) => {
                jwt.sign(
                  { id: user.id },
                  jwtSecret,
                  { expiresIn: 3600 },
                  (err, token) => {
                    res.json({
                      ...user,
                      success: true,
                      token: "Bearer " + token,
                    });
                  }
                );
                return;
              })
              .catch((error) => {
                const err = new Exception("error in add user ", 500, error);
                res.status(500).send(err.send());
              });
          }
        })
        .catch((error) => {
          const err = new Exception("error in add user,", 500, error);
          res.status(500).send(err.send());
        });
    } catch (error) {
      const err = new Exception("error in Login ", 500, error);
      res.status(500).send(err.send());
    }
  }
);
export default AuthRouter;
