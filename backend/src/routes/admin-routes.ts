import express from "express";
import multer from "multer";
import path from "path";
import {
  add_product,
  delete_product,
  update_product,
  view_product,
} from "../controllers/admin-controller";
import {
  verify_token,
  check_role,
} from "../middlewares/token-role-verification";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.post(
  "/add-product",
  verify_token,
  check_role("admin"),
  upload.single("image"),
  add_product
);

router.get("/view-products", verify_token, check_role("admin"), view_product);

router.delete(
  "/delete-product/:id",
  verify_token,
  check_role("admin"),
  delete_product
);

router.put(
  "/update-product/:id",
  verify_token,
  check_role("admin"),
  upload.single("image"),
  update_product
);

export default router;
