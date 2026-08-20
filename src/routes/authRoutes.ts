import "dotenv/config";
import express from "express";
import type { Router, Request, Response, NextFunction } from "express";
import { modifySession, logOutUser } from "../controllers/getControllers.js";
import { LogInMember, LogInAdmin } from "../controllers/patchControllers.js";
import { signUpUser, LogInUser } from "../controllers/postControllers.js";
import { ensureAuthenticated } from "../middleware/authMiddleware.js";
import type { UserRow } from "../db/database.types.js";

const authRouter: Router = express.Router();

authRouter.get("/login", modifySession);

authRouter.get("/signup", (req: Request, res: Response) => {
  return res.status(200).render("signup");
});

authRouter.post("/login", LogInUser);

authRouter.post("/signup", signUpUser);

authRouter.get("/logout", logOutUser);

authRouter.get(
  "/memberLogin",
  ensureAuthenticated,
  (req: Request, res: Response) => {
    const user = req.user as UserRow;
    const userId: number | undefined = user.id;
    return res.status(200).render("memberLogin", { userId: userId });
  },
);

authRouter.get(
  "/adminLogin",
  ensureAuthenticated,
  (req: Request, res: Response) => {
    const user = req.user as UserRow;
    const userId: number | undefined = user.id;
    return res.status(200).render("adminLogin", { userId: userId });
  },
);

authRouter.patch("/memberLogin/:userId/patch", LogInMember);

authRouter.patch("/adminLogin/:userId/patch", LogInAdmin);

export default authRouter;
