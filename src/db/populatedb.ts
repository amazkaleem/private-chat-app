import "dotenv/config";
import { Client } from "pg";

const SQL = `
    -- 1. ENUM TYPE FOR USER ROLES
    CREATE TYPE user_role AS ENUM ('standard', 'member', 'admin');

    -- 2. USERS TABLE
    CREATE TABLE users (
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        membership_status user_role NOT NULL DEFAULT 'standard',
        created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
    );


    -- 3. MESSAGES TABLE
    CREATE TABLE messages (
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        text TEXT NOT NULL,
        author_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    -- Index for fetching feed ordered by latest timestamp
    CREATE INDEX idx_messages_created_at ON messages(created_at DESC);

    -- 4. READ RECEIPTS TABLE (Per-User Read Tracking)
    CREATE TABLE read_receipts (
        user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        message_id INT NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
        read_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (user_id, message_id)
    );

    CREATE TABLE "session" (
        "sid" varchar NOT NULL COLLATE "default",
        "sess" json NOT NULL,
        "expire" timestamp(6) NOT NULL
    )
    WITH (OIDS=FALSE);

    ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

    CREATE INDEX "IDX_session_expire" ON "session" ("expire");
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    host: "localhost",
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: Number(process.env.DB_PORT) || 5432,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
