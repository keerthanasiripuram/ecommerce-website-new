import express from "express";
import { getFilteredProducts, getProductById, getProducts, getUser, updateProfile } from "../controllers/user-controller";
import { checkRole, verifyToken } from "../middlewares/token-role-verification";

const router = express.Router();



router.get("/get-products", getProducts);

router.get("/get-product/:id", getProductById);

router.get("/get-user", verifyToken, checkRole("customer"), getUser);

router.put(
  "/update-profile",
  verifyToken,
  checkRole("customer"),
  updateProfile
);

router.get("/get-filtered-products", getFilteredProducts);

export default router;
