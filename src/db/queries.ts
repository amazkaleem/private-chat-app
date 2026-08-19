import pool from "./pool.js";
import type { UserRow } from "./database.types.js";

export async function signUpUserQuery(
  first_name: string,
  last_name: string,
  email: string,
  password: string,
): Promise<void> {
  const queryText: string =
    "INSERT INTO users (first_name, last_name, email, password_hash) VALUES ($1, $2, $3, $4)";
  const values: string[] = [first_name, last_name, email, password];
  try {
    await pool.query(queryText, values);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown database error";
    throw new Error(`Error while signing up user: ${message}`);
  }
}

export async function getUserQuery(
  user_id?: number,
  email?: string,
): Promise<UserRow | null> {
  if (!email && user_id === undefined) {
    // In JavaScript/TypeScript, throw does not “return normally”; it exits abruptly and unwinds the stack.
    // the error propagates outward to the caller unless it is caught with try/catch in here. it unwinds the call stack
    throw new Error("Either email or user_id must be provided.");
  }

  const queryText = email
    ? "SELECT * FROM users WHERE email = $1"
    : "SELECT * FROM users WHERE id = $1";
  // The ! (non-null assertion operator) tells TypeScript: "Trust me, user_id will definitely have a value here, so don't throw a null warning."
  const values: Array<string | number> = [email ?? user_id!];

  try {
    const result = await pool.query<UserRow>(queryText, values);
    return result.rows[0] ?? null;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown database error";
    throw new Error(`Error while getting user: ${message}`);
  }
}
