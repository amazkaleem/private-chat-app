import express from "express";
import type { Router, Request, Response } from "express";

const authRouter: Router = express.Router();

authRouter.get("/login", (req: Request, res: Response) => {
  res.status(200).render("login");
});

authRouter.get("/signup", (req: Request, res: Response) => {
  res.status(200).render("signup");
});

authRouter.post(
  "/login",
  (req: Request, res: Response<{ message: string }>) => {
    res.status(200).json({ message: "Log in is working in the backend..." });
  },
);

authRouter.post(
  "/signup",
  (req: Request, res: Response<{ message: string }>) => {
    res.status(200).json({ message: "Sign Up is working in the backend..." });
  },
);

export default authRouter;
