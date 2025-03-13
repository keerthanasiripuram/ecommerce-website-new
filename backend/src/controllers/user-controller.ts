import { Request, Response } from "express";
import {
  register_user_service,
  login_user_service,
  fetch_user_service,
  update_profile_service,
  view_product_service,
  filtered_product_service,
  view_product_by_id_service,
} from "../services/user-service";
import { User } from "../models/user-model";
import { CustomError } from "../errorObject";
import { CustomRequest } from "../middlewares/token-role-verification";

export const create_user = async (
  req: Request,
  res: Response
): Promise<any> => {
  const {
    name,
    email,
    mobile_number,
    password,
    confirm_password,
    role,
    address,
  }: User = req.body;

  try {
    const user_response = await register_user_service({
      name,
      email,
      mobile_number,
      password,
      confirm_password,
      role,
      address,
    });

    return res.status(201).json({
      message: "User created successfully",
      data: user_response,
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

export const login = async (req: Request, res: Response): Promise<any> => {
  const { email, password }: { email: string; password: string } = req.body;

  try {
    const user_response = await login_user_service({ email, password });

    return res.status(200).json({
      message: "User logged in successfully",
      data: user_response,
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

export const fetch_user = async (
  req: CustomRequest,
  res: Response
): Promise<any> => {
  const user_id = Number(req.id);

  try {
    const user_response = await fetch_user_service(user_id);

    return res.status(200).json({
      message: "User Data fetched successfully",
      data: user_response,
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

export const update_profile = async (
  req: CustomRequest,
  res: Response
): Promise<any> => {
  const user_id = Number(req.id);

  const { name, email, mobile_number, role, address }: User = req.body;

  try {
    const user_response = await update_profile_service(user_id, {
      name,
      email,
      mobile_number,
      role,
      address,
    });

    return res.status(200).json({
      message: "User profile updated successfully",
      data: user_response,
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

export const view_product = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const user_response = await view_product_service();

    return res.status(200).json({
      message: "prodcurs fetched successfully",
      data: user_response,
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

export const view_product_by_id = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const product_id = Number(req.params.id);

    const user_response = await view_product_by_id_service(product_id);

    return res.status(200).json({
      message: "prodcurs fetched successfully",
      data: user_response,
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

export const filtered_product = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const category = req.query.category as string;

    const title = req.query.searchquery
      ? (req.query.searchquery as string)
      : "";

    const rating = req.query.rating as string;

    const price_range = req.query.pricerange as string;

    const converted_rating = Number(rating);

    const min_price = Number(price_range.split(",")[0]);

    const max_price = Number(price_range.split(",")[1]);

    const current_page = req.query.page as string;

    const converted_curr_page = Number(current_page);

    const user_response = await filtered_product_service({
      category,
      title,
      converted_rating,
      min_price,
      max_price,
      converted_curr_page,
    });

    return res.status(200).json({
      message: "filtered prodcurs fetched successfully",
      data: user_response,
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
