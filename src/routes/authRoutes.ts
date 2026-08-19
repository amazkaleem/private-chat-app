import express from "express";
import type { Router, Request, Response, NextFunction } from "express";
import { signUpUser, LogInUser } from "../controllers/authControllers.js";

const authRouter: Router = express.Router();

authRouter.get("/login", (req: Request, res: Response) => {
  const session = req.session as any;
  const messages = session.messages;

  let errorMessage = null;

  // We only extract out and delete the messages property of the req.session object once we are sure that
  // the user has failed login procedure
  // So that session cookie is ONLY generated once a user logs in
  if (messages?.length) {
    errorMessage = messages[messages.length - 1];
    delete session.messages;  // delete keyword can be used to delete properties from an object, though recommended to not use it for arrays
  }

  return res.status(200).render("login", { message: errorMessage });
});

authRouter.get("/signup", (req: Request, res: Response) => {
  return res.status(200).render("signup");
});

authRouter.post("/login", LogInUser);

authRouter.post("/signup", signUpUser);

export default authRouter;
