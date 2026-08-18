import type { VerifyFunction } from "passport-local";
import bcrypt from "bcrypt";
import pool from "../db/pool.js";
import { Strategy as LocalStrategy } from "passport-local";
import passport from "passport";
import type { UserRow } from "../db/database.types.js";

//In passport.ts, LocalStrategy defaults to field username
const customFields = {
  usernameField: "email",
};

// 2. Apply the 'VerifyFunction' type from passport-local
const verifyCallback: VerifyFunction = async (
  username: string,
  password: string,
  done: (error: any, user?: any, info?: any) => void,
) => {
  try {
    // 3. Pass the <User> generic to pool.query so 'rows' is typed as User[]
    const { rows } = await pool.query<UserRow>(
      "SELECT * FROM users WHERE email = $1",
      [username],
    );
    const user = rows[0];

    if (!user) {
      return done(null, false, { message: "Incorrect username" });
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      console.log(
        "You are comparing a hashed password with plain text password",
      );
      // Passwords do not match
      return done(null, false, { message: "Incorrect password" });
    }

    return done(null, user);
  } catch (err) {
    return done(err);
  }
};

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

/**
 * Gemini Ai
 * In TypeScript, Express.User is a global interface provided by the Express type definitions (@types/express)
 * specifically designed to hold authenticated user information on the req.user object.
 * By default, it is defined as an empty interface. It acts as a blank canvas meant to be extended by authentication middleware libraries like Passport.js or by your own custom application.
 */
passport.serializeUser(function (
  user: Express.User,
  cb: (error: any, user?: any, info?: any) => void,
) {
  const currentUser = user as UserRow;
  cb(null, currentUser.id);
});

passport.deserializeUser(
  async (id: number, done: (error: any, user?: any, info?: any) => void) => {
    try {
      const result = await pool.query<UserRow>(
        "SELECT * FROM users WHERE id = $1",
        [id],
      );

      const user = result.rows[0];

      if (!user) {
        return done(null, false);
      }

      done(null, user);
    } catch (error) {
      done(error);
    }
  },
);
