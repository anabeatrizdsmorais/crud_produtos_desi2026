import mysql2 from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const db = mysql2.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

export default db;