import express, { Application } from "express";
import router from "./routes";

/********************************************* config *********************************************/
const PORT = process.env.PORT || 5000;
const app: Application = express();
app.use(express.json()); // To parse the incoming requests with JSON payloads
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

app.get("/api", (req, res) => {
  let a = "hello";
  console.log(a);
  res.send("Hello World");
});
app.use("/api", router);
