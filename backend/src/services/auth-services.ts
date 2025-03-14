import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { CustomError } from "../errorObject";
import path from "path";
import dotenv from "dotenv";
import { User } from "../models/user-model";
import {checkUser } from "../repositories/user-repository";
import { loginUserRepo, registerUserRepo } from "../repositories/auth-repository";
dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

const secretKey = process.env.SECRET_KEY;
export const registerUserService = async (user: User): Promise<User> => {
      const userFromDB = await checkUser({
        name: user.name,
        email: user.email,
      });
      console.log(userFromDB)
      if (userFromDB) {
        // throw new Error("User already exist")
        throw new Error("CONFLICT");
      }
      
  
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);
      
      console.log("data",userFromDB)
      return await registerUserRepo({
        ...user,
        password: hashedPassword,
      });
      
  };

  export const loginUserService = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<any> => {
    try {
      const userData = await loginUserRepo({ email, password });
  
      const isMatch = await bcrypt.compare(password, userData.password);
  
      if (!isMatch) {
        throw new CustomError("Password is incorrect", 401);
      }
  
      const token = jwt.sign(
        { id: userData.id, role: userData.role },
        secretKey!,
        { expiresIn: "1d" }
      );
      return token;
    } catch (err) {
      console.error("Service error:", err);
      throw err;
    }
}