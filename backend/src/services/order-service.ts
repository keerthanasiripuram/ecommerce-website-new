import { Order } from "../models/order-model";
import {
  order_products_db,
  view_order_db,
  view_orders_by_admin_db,
  change_order_status_db,
  cancel_order_db,
} from "../repositories/order-repository";

export const order_products_service = async (
  order: Order
): Promise<Order[]> => {
  try {
    const order_data = await order_products_db(order);
    return order_data;
  } catch (err) {
    console.error("Service error:", err);
    throw err;
  }
};

export const view_order_service = async (user_id: Number): Promise<Order[]> => {
  try {
    const view_order = await view_order_db(user_id);
    return view_order;
  } catch (err) {
    console.error("Service error:", err);
    throw err;
  }
};

export const view_orders_by_admin_service = async (): Promise<Order[]> => {
  try {
    const user_data = await view_orders_by_admin_db();
    return user_data;
  } catch (err) {
    console.error("Service error:", err);
    throw err;
  }
};

export const change_order_status_service = async (order: {
  order_status: string;
  user_id: number;
  product_id: number;
  order_id: number;
  quantity: number;
}): Promise<Order[]> => {
  try {
    const order_data_status = await change_order_status_db(order);
    return order_data_status;
  } catch (err) {
    console.error("Service error:", err);
    throw err;
  }
};

export const cancel_order_service = async (order: {
  order_status: string;
  user_id: number;
  product_id: number;
  order_id: number;
  quantity: number;
}): Promise<Order[]> => {
  try {
    const order_data_status = await cancel_order_db(order);
    return order_data_status;
  } catch (err) {
    console.error("Service error:", err);
    throw err;
  }
};
