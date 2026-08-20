import express from "express";
import type { Router, Request, Response, NextFunction } from "express";
import { ensureAuthenticated } from "../middleware/authMiddleware.js";
import {
  createMessageQuery,
  getAllMessagesQuery,
  getUserQuery,
} from "../db/queries.js";
import type { UserRow } from "../db/database.types.js";

const chatsRouter: Router = express.Router();

chatsRouter.get(
  "/chat-messages",
  ensureAuthenticated,
  async (req: Request, res: Response) => {
    // We will get all messages by the user and pass them over to the template to render
    // We will also pass over the other messages to be render on the right side of the template
    // The user object is also passed for labels within the template
    console.log(req.user);

    const user = req.user as UserRow;
    const userId: number | undefined = user.id;

    try {
      const messages = await getAllMessagesQuery();
      return res.status(200).render("chat", {
        userObject: req.user,
        messages: messages
      });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).render("chat", { message: error.message });
      }
    }
  },
);

chatsRouter.post(
  "/chat-messages/:authorId",
  ensureAuthenticated,
  async (req: Request, res: Response) => {
    const { authorId } = req.params;
    const author_id = Number(authorId);
    const { messageText } = req.body;
    const title = "private message";

    try {
      await createMessageQuery(author_id, title, messageText);
      return res.status(200).redirect("/chat-messages");
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).render("chat", { message: error.message });
      }
    }
  },
);

export default chatsRouter;
