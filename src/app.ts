import "dotenv/config";
import express, { urlencoded } from "express";
import type { Express, Request, Response } from "express";
import { fileURLToPath } from "url";
import path from "path";
import authRouter from "./routes/authRoutes.js";
import chatsRouter from "./routes/chatRoutes.js";
import passport from "passport";
import pool from "./db/pool.js";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import type { KeyLike } from "crypto";
import "./config/passport.js";

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = path.dirname(__filename);

const port: string | undefined = process.env.PORT;
const app: Express = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const pgSession = connectPgSimple(session);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const pgStore = new pgSession({
  pool: pool,
  tableName: "session",
  pruneSessionInterval: 60 * 15,
});

const sessionSecret = process.env.FOO_COOKIE_SECRET as KeyLike;

app.use(
  session({
    store: pgStore,
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 1 day
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req: Request, res: Response) => {
  return res.status(200).render("index");
});

app.use(authRouter);
app.use(chatsRouter);

app.listen(port, (error) => {
  if (error) {
    throw error;
  }
  console.log(`The server is healthy and running at port number ${port}`);
});
