import { Request, Response } from "express";
import {
  order_products_service,
  view_order_service,
  view_orders_by_admin_service,
  change_order_status_service,
  cancel_order_service,
} from "../services/order-service";
import { Order } from "../models/order-model";
import { CustomError } from "../errorObject";
import { CustomRequest } from "../middlewares/token-role-verification";

export const order_products = async (
  req: CustomRequest,
  res: Response
): Promise<any> => {
  try {
    const { product_id_arr, tot_sum }: Order = req.body;

    const user_id = Number(req.id);

    const order_response = await order_products_service({
      user_id,
      product_id_arr,
      tot_sum,
    });

    return res.status(200).json({
      message: "Product ordered successfully",
      data: order_response,
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

export const view_order = async (
  req: CustomRequest,
  res: Response
): Promise<any> => {
  try {
    const user_id = Number(req.id);

    const order_response = await view_order_service(user_id);

    return res.status(200).json({
      message: "Orders Data fetched successfully",
      data: order_response,
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

export const view_orders_by_admin = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const order_response = await view_orders_by_admin_service();

    return res.status(200).json({
      message: "Orders Data fetched successfully",
      data: order_response,
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

export const change_order_status = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const {
      order_status,
      user_id,
      product_id,
      order_id,
      quantity,
    }: {
      order_status: string;
      user_id: number;
      product_id: number;
      order_id: number;
      quantity: number;
    } = req.body;

    const order_response = await change_order_status_service({
      order_status,
      user_id,
      product_id,
      order_id,
      quantity,
    });

    return res.status(200).json({
      message: "Order status changed successfully",
      data: order_response,
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

export const cancel_order = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const {
      order_status,
      user_id,
      product_id,
      order_id,
      quantity,
    }: {
      order_status: string;
      user_id: number;
      product_id: number;
      order_id: number;
      quantity: number;
    } = req.body;

    const order_response = await cancel_order_service({
      order_status,
      user_id,
      product_id,
      order_id,
      quantity,
    });

    return res.status(200).json({
      message: "Order status changed successfully",
      data: order_response,
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
