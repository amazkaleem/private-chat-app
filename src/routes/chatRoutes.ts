import express from "express";
import type { Router, Request, Response, NextFunction  } from "express";
import { ensureAuthenticated } from "../middleware/authMiddleware.js";

const chatsRouter: Router = express.Router();

chatsRouter.get("/chat-messages", ensureAuthenticated, (req: Request, res: Response) => {
    return res.status(200).render("chat");
});


export default chatsRouter;