import "dotenv/config";
import express, { urlencoded } from "express";
import type { Express, Request, Response } from "express";
import { fileURLToPath } from "url";
import path from "path";
import authRouter from "./routes/authRoutes.js";

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = path.dirname(__filename);

const port: string | undefined = process.env.PORT;
const app: Express = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).render("index");
});

app.use(authRouter);

app.listen(port, (error) => {
  if (error) {
    throw error;
  }
  console.log(`The server is healthy and running at port number ${port}`);
});
