import pool from "../db";
import { CustomError } from "../errorObject";
import {
  User,
  UserLogin,
} from "../models/user-model";
export const registerUserRepo = async (user: User): Promise<User> => {
    const client = await pool.connect();
    console.log(user)
    const { name, email, mobile_number, password, role, address } = user;
    const query = `INSERT INTO "users" (name,email,mobilenumber,password,role,address) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`;
      const result = (await client.query(query, [
      name,
      email,
      mobile_number,
      password,
      role,
      address,
    ]))
    return result.rows[0]
};

export const loginUserRepo = async (user: {
    email: string;
    password: string;
  }): Promise<UserLogin> => {
    const client = await pool.connect();
  
    try {
      const { email, password } = user;
  
      const query = `SELECT id, role, password FROM "users" WHERE email=$1`;
  
      const result = await pool.query(query, [email]);
  
      if (result.rowCount === 0) {
        throw new CustomError("User doesn't exist", 404);
      }
  
      return result.rows[0];
    } catch (err: any) {
      if (err.code) {
        console.error("Database error:", err);
  
        throw new CustomError("Database error occurred", 500);
      }
      throw err;
    } finally {
      client.release();
    }
  };