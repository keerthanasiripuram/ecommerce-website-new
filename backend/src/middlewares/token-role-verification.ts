import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export type CustomRequest = Request & {
  id?: string;
  role?: string;
};

interface DecodedToken {
  id: string;
  role: string;
}

export const verify_token = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): any => {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(403).send({ message: "Token is required" });
    }
    const tokenWithoutBearer = token.startsWith("Bearer ")
      ? token.slice(7)
      : token;
    jwt.verify(tokenWithoutBearer, "KEERTHANA", (err: any, decoded: any) => {
      if (err) {
        return res.status(403).send({ message: "Invalid Request" });
      }
      if (decoded) {
        const decodedToken = decoded as DecodedToken;
        req.id = decodedToken.id;
        req.role = decodedToken.role;
        console.log(req.id, req.role);
      }
      next();
    });
  } catch (err) {
    next(err);
  }
};

export const check_role = (role: string): any => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    if (req.role !== role) {
      return res.status(403).send({ message: "Access Denied" });
    }
    next();
  };
};
