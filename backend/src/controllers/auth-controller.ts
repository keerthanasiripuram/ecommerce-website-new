import { Request,Response,NextFunction } from "express";
import { CustomError } from "../errorObject";
import { loginUserService, registerUserService } from "../services/auth-services";
import { User } from "../models/user-model";

export const registerUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const userResponse = await registerUserService(req.body as User);
      return res.status(201).json({
        message: "User created successfully",
        data: userResponse,
      });
    } catch (err: any) {
      next(err)
    }
  };


  export const login = async (req: Request, res: Response): Promise<any> => {
    const { email, password }: { email: string; password: string } = req.body;
    console.log(password, typeof(password),Number(password))
    try {
      const userResponse = await loginUserService({ email, password });
  
      return res.status(200).json({
        message: "User logged in successfully",
        data: userResponse,
      });
    } catch (err: any) {
      if (err instanceof CustomError) {
        return res.status(err.statusCode).json({
          message: err.message,
        });
      }
  
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  };