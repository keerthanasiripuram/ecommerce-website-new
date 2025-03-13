import { Request, Response } from "express";
import {
  add_product_service,
  delete_product_service,
  update_product_service,
  view_product_service,
} from "../services/admin-services";
import { CustomError } from "../errorObject";

type product_state = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  images: string;
};

export const add_product = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const product_data: product_state = req.body;

    const imagePath = req.file ? req.file.path : null;

    if (imagePath) {
      product_data.images = imagePath;
    }

    const admin_response = await add_product_service(product_data);

    return res.status(201).json({
      message: "add product successfully",
      data: admin_response,
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
    const admin_response = await view_product_service();

    return res.status(200).json({
      message: "prodcurs fetched successfully",
      data: admin_response,
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

export const delete_product = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const product_id: number = parseInt(req.params.id, 10);

    const admin_response = await delete_product_service(product_id);

    return res.status(200).json({
      message: " product deleted successfully",
      data: admin_response,
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

export const update_product = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const product_data: product_state = req.body;

    const product_id: number = parseInt(req.params.id, 10);

    const imagePath = req.file ? req.file.path : null;

    if (imagePath) {
      product_data.images = imagePath;
    }

    product_data.id = product_id;

    const admin_response = await update_product_service(product_data);

    return res.status(200).json({
      message: " product updated successfully",
      data: admin_response,
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
