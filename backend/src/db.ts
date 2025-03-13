import { Pool } from "pg";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

const db_user = process.env.USER;
const host = process.env.HOST;
const database = process.env.DATABASE;
const password = process.env.PASSWORD;
const port = process.env.PORT;

const pool = new Pool({
  user: db_user,
  host: host,
  database: database,
  password: password,
  port: Number(port),
});

export default pool;
