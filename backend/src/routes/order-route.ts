import express from "express";
import {
  order_products,
  view_order,
  view_orders_by_admin,
  change_order_status,
  cancel_order,
} from "../controllers/order-controller";
import {
  check_role,
  verify_token,
} from "../middlewares/token-role-verification";

const router = express.Router();

router.post(
  "/place-order",
  verify_token,
  check_role("customer"),
  order_products
);

router.get("/view-order", verify_token, check_role("customer"), view_order);

router.get(
  "/view-orders-by-admin",
  verify_token,
  check_role("admin"),
  view_orders_by_admin
);

router.put(
  "/change-order-status",
  verify_token,
  check_role("admin"),
  change_order_status
);

router.put("/cancel-order", verify_token, check_role("admin"), cancel_order);

export default router;
