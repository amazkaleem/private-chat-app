import express from "express";
import type { Request, Response } from "express";
import { deleteMessageQuery } from "../db/queries.js";

export const deleteMessage = async (req: Request, res: Response) => {
  const { messageId } = req.params;
  const message_id = Number(messageId);

  try {
    await deleteMessageQuery(message_id);
    return res.status(200).redirect("/chat-messages");
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).render("chat", { message: error.message });
    }
  }
};
