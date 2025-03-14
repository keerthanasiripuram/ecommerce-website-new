import { Pool } from "pg";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

const dbUser = process.env.DB_USER;
const host = process.env.DB_HOST;
const database = process.env.DATABASE;
const password = process.env.DB_PASSWORD;
const port = process.env.DB_PORT;

const pool = new Pool({
  user: dbUser,
  host: host,
  database: database,
  password: password,
  port: Number(port),
});
console.log(pool)
export default pool;
