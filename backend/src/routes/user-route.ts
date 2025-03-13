import express from "express";
import {
  create_user,
  login,
  fetch_user,
  update_profile,
  view_product,
  filtered_product,
  view_product_by_id,
} from "../controllers/user-controller";
import {
  verify_token,
  check_role,
} from "../middlewares/token-role-verification";

const router = express.Router();

router.post("/register", create_user);

router.post("/login", login);

router.get("/view-products", view_product);

router.get("/view-product/:id", view_product_by_id);

router.get("/fetch-user", verify_token, check_role("customer"), fetch_user);

router.put(
  "/update-profile",
  verify_token,
  check_role("customer"),
  update_profile
);

router.get("/filtered-products", filtered_product);

export default router;
