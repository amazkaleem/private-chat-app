import type { Request, Response, NextFunction } from "express";
import type { UserRow } from "../db/database.types.js";
import { getAllMessagesQuery } from "../db/queries.js";

export const modifySession = (req: Request, res: Response) => {
  const session = req.session as any;
  const messages = session.messages;

  let errorMessage = null;

  // We only extract out and delete the messages property of the req.session object once we are sure that
  // the user has failed login procedure
  // So that session cookie is ONLY generated once a user logs in
  if (messages?.length) {
    errorMessage = messages[messages.length - 1];
    delete session.messages; // delete keyword can be used to delete properties from an object, though recommended to not use it for arrays
  }

  return res.status(200).render("login", { message: errorMessage });
};

export const logOutUser = (req: Request, res: Response, next: NextFunction) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
};

export const getChat = async (req: Request, res: Response) => {
  const user = req.user as UserRow;
  const userId: number | undefined = user.id;

  try {
    const messages = await getAllMessagesQuery();
    return res.status(200).render("chat", {
      userObject: req.user,
      messages: messages,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).render("chat", { message: error.message });
    }
  }
};
