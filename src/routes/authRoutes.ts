import express from "express";
import type { Router, Request, Response, NextFunction } from "express";
import { signUpUser, LogInUser } from "../controllers/authControllers.js";

const authRouter: Router = express.Router();

authRouter.get("/login", (req: Request, res: Response) => {
  // 1. Passport stores failure messages in an array on the session
  // We use `as any` here to bypass TS strictness, or you can extend the SessionData interface
  const messages = (req.session as any).messages || [];

  // 2. Clear the messages so the error disappears on a page refresh
  (req.session as any).messages = [];

  // 3. Grab the most recent message (if any exist)
  const errorMessage = messages.length > 0 ? messages[messages.length - 1] : null;

  // 4. Render the page and pass the message
  res.status(200).render("login", { message: errorMessage });
});

authRouter.get("/signup", (req: Request, res: Response) => {
  res.status(200).render("signup");
});

authRouter.post("/login", LogInUser);

authRouter.post("/signup", signUpUser);

export default authRouter;
