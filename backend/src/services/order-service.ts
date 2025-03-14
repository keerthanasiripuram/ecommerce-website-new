import { ChangeStatus, Order } from "../models/order-model";
import { cancelOrderRepo, changeOrderStatusRepo, getOrdersByAdminRepo, getOrdersRepo, orderProductsRepo } from "../repositories/order-repository";

export const orderProductsService = async (
  order: Order
): Promise<Order[]> => {
  try {
    const orderData = await orderProductsRepo(order);
    return orderData;
  } catch (err) {
    console.error("Service error:", err);
    throw err;
  }
};

export const getOrdersService = async (user_id: Number): Promise<Order[]> => {
  try {
    const viewOrder = await getOrdersRepo(user_id);
    return viewOrder;
  } catch (err) {
    console.error("Service error:", err);
    throw err;
  }
};

export const getOrdersByAdminService = async (): Promise<Order[]> => {
  try {
    const userData = await getOrdersByAdminRepo();
    return userData;
  } catch (err) {
    console.error("Service error:", err);
    throw err;
  }
};

export const changeOrderStatusService = async (changeStatusData:ChangeStatus): Promise<Order[]> => {
  try {
    const orderStatus = await changeOrderStatusRepo(changeStatusData);
    return orderStatus;
  } catch (err) {
    console.error("Service error:", err);
    throw err;
  }
};

export const cancelOrderService = async (changeStatusData:ChangeStatus): Promise<Order[]> => {
  try {
    const orderStatus = await cancelOrderRepo(changeStatusData);
    return orderStatus;
  } catch (err) {
    console.error("Service error:", err);
    throw err;
  }
};
