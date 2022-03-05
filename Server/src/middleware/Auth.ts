import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const jwtSecret = process.env.ACCESS_TOKEN_SECRET;

export default function (req, res, next) {
  //Get token from header
  const authHeader = req.headers["authorization"];
  console.log(authHeader);
  const TOKEN = authHeader && authHeader.split(" ")[1];
  //Check if no token
  if (!TOKEN) {
    return res.status(401).json({
      msg: "No token, authorization denied",
    });
  }

  //Verify token
  try {
    const decoded = jwt.verify(TOKEN, jwtSecret);

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({
      msg: "Token is not valid",
    });
  }
}
