import pool from "./pool.js";

export async function signUpUserQuery(first_name: string, last_name: string, email: string, password:string): Promise<void> {
    const queryText:string = "INSERT INTO users (first_name, last_name, email, password_hash) VALUES ($1, $2, $3, $4)";
    const values:string[] = [first_name, last_name, email, password];
    try {
        await pool.query(queryText, values);
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown database error";
        throw new Error(`Error while signing up user: ${message}`);
    }
};