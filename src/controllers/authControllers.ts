import type { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { getUserQuery, signUpUserQuery } from "../db/queries.js";
import { body, validationResult } from "express-validator";
import type { ValidationChain } from "express-validator";
import passport from "passport";
import { error } from "node:console";

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";
const emailErr = "must be in the format username@domainname";
const passErr =
  "at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.";

const validateUserSignUp: ValidationChain[] | undefined = [
  body("firstName")
    .trim()
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`First name ${lengthErr}`),
  body("lastName")
    .trim()
    .isAlpha()
    .withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`Last name ${lengthErr}`),
  body("email").trim().isEmail().withMessage(`Email ${emailErr}`),
  body("password")
    .trim()
    .isStrongPassword()
    .withMessage(`Password must be ${passErr}`),
];

const validateUserLogIn: ValidationChain[] | undefined = [
  body("email").trim().isEmail().withMessage(`Email ${emailErr}`),
  body("password").trim(),
];

interface SignUpRequestBody {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface LogInRequestBody {
  email: string;
  password: string;
}

export const signUpUser = [
  ...validateUserSignUp,
  async (
    req: Request<{}, {}, SignUpRequestBody>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("signup", { errors: errors.array() });
    }
    try {
      const { firstName, lastName, email, password } = req.body;

      const user = await getUserQuery(undefined, email);

      if (user) {
        return res.status(400).render("signup", {
          errors: [
            {
              msg: "There is already a user with this email. Please try another email.",
            },
          ],
        });
      }

      const hashedPassword: string = await bcrypt.hash(password, 10);
      await signUpUserQuery(firstName, lastName, email, hashedPassword);
    } catch (error) {
      console.error(error);
      next(error);
    }
    return passport.authenticate("local", {
      successRedirect: "/chat-messages",
      failureRedirect: "/signup",
    })(req, res, next);
  },
];

export const LogInUser = [
  ...validateUserLogIn,
  (
    req: Request<{}, {}, LogInRequestBody>,
    res: Response,
    next: NextFunction,
  ) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("login", { errors: errors.array() });
    }
    return passport.authenticate("local", {
      successRedirect: "/chat-messages",
      failureRedirect: "/login",
      failureMessage: true,
    })(req, res, next);
  },
];
