import express from "express";
import type { Router } from "express";
import { ensureAuthenticated } from "../middleware/authMiddleware.js";
import { getChat } from "../controllers/getControllers.js";
import { deleteMessage } from "../controllers/deleteControllers.js";
import { createMessage } from "../controllers/postControllers.js";

const chatsRouter: Router = express.Router();

chatsRouter.get("/chat-messages", ensureAuthenticated, getChat);

chatsRouter.post(
  "/chat-messages/:authorId",
  ensureAuthenticated,
  createMessage,
);

chatsRouter.delete("/chat-messages/:messageId/delete", ensureAuthenticated, deleteMessage);

export default chatsRouter;
