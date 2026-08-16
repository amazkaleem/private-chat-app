import "dotenv/config";
import express from "express";
import type { Express, Request, Response } from "express";

const port = process.env.PORT;
const app: Express = express();

app.use(express.json());

app.get("/", (req: Request, res: Response<{ message: string }>) => {
  res.status(200).json({ message: "Welcome to the App!" });
});

app.listen(port, (error) => {
  if (error) {
    throw error;
  }
  console.log(`The server is healthy and running at port number ${port}`);
});
