import { Request, Response } from "express";
import { cancelOrderService, changeOrderStatusService, getOrdersByAdminService, getOrdersService, orderProductsService } from "../services/order-service";
import { CustomError } from "../errorObject";
import { CustomRequest } from "../middlewares/token-role-verification";
import { ChangeStatus } from "../models/order-model";


export const orderProducts = async (
  req: CustomRequest,
  res: Response
): Promise<any> => {
  try {
    // const { product_id_arr, tot_sum }: Order = req.body;

    const userId = Number(req.id);

    const orderResponse = await orderProductsService({
      userId,
      ...req.body
    });

    return res.status(200).json({
      message: "Product ordered successfully",
      data: orderResponse,
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

export const getOrders = async (
  req: CustomRequest,
  res: Response
): Promise<any> => {
  try {
    const userId = Number(req.id);

    const orderResponse = await getOrdersService(userId);

    return res.status(200).json({
      message: "Orders Data fetched successfully",
      data: orderResponse,
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

export const getOrdersByAdmin = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const orderResponse = await getOrdersByAdminService();

    return res.status(200).json({
      message: "Orders Data fetched successfully",
      data: orderResponse,
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

export const changeOrderStatus = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const orderResponse = await changeOrderStatusService(req.body as ChangeStatus)

    return res.status(200).json({
      message: "Order status changed successfully",
      data: orderResponse,
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

export const cancelOrder = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const orderResponse = await cancelOrderService(req.body as ChangeStatus);

    return res.status(200).json({
      message: "Order status changed successfully",
      data: orderResponse,
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
