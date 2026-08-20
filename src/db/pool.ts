import "dotenv/config";
import { Pool } from "pg";

const pool = new Pool({
  host: "localhost",
  user: process.env.POSTGRES_USER,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: Number(process.env.DB_PORT) || 5432,
});

export default pool;