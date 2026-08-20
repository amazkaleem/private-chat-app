import type { Request, Response } from "express";
import { patchStatusQuery } from "../db/queries.js";

export const LogInMember = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { memberLoginInput } = req.body;
  const user_id = Number(userId);

  try {
    if (memberLoginInput !== process.env.MEMBER_PASSCODE) {
      throw new Error("Wrong Passcode! Please try again...");
    }
    await patchStatusQuery(user_id, "member");
    return res.status(200).redirect("/chat-messages");
  } catch (error) {
    if (error instanceof Error) {
      return res
        .status(500)
        .render("memberLogin", { userId: userId, message: error.message });
    }
  }
};

export const LogInAdmin = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { adminLoginInput } = req.body;
  const user_id = Number(userId);

  try {
    if (adminLoginInput !== process.env.ADMIN_PASSCODE) {
      throw new Error("Wrong Passcode! Please try again...");
    }
    await patchStatusQuery(user_id, "admin");
    return res.status(200).redirect("/chat-messages");
  } catch (error) {
    if (error instanceof Error) {
      return res
        .status(500)
        .render("adminLogin", { userId: userId, message: error.message });
    }
  }
};
