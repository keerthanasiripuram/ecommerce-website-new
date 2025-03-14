import express from "express";
import { cancelOrder, changeOrderStatus, getOrders, getOrdersByAdmin, orderProducts } from "../controllers/order-controller";
import {
  checkRole,
  verifyToken,
} from "../middlewares/token-role-verification";

const router = express.Router();

router.post(
  "/post-order",
  verifyToken,
  checkRole("customer"),
  orderProducts
);

router.get("/get-orders", verifyToken, checkRole("customer"), getOrders);

router.get(
  "/get-orders-by-admin",
  verifyToken,
  checkRole("admin"),
  getOrdersByAdmin
);

router.put(
  "/change-order-status",
  verifyToken,
  checkRole("admin"),
  changeOrderStatus
);

router.put("/cancel-order", verifyToken, checkRole("admin"), cancelOrder);

export default router;
