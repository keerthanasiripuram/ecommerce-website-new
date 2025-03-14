import express from "express";
import multer from "multer";
import path from "path";
import {
  deleteProduct,
  getProducts,
  postProduct,
  updateProduct,
} from "../controllers/admin-controller";
import {
  verifyToken,
  checkRole,
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
  "/post-product",
  verifyToken,
  checkRole("admin"),
  upload.single("image"),
  postProduct
);

router.get("/get-products", verifyToken, checkRole("admin"), getProducts);

router.delete(
  "/delete-product/:id",
  verifyToken,
  checkRole("admin"),
  deleteProduct
);

router.put(
  "/update-product/:id",
  verifyToken,
  checkRole("admin"),
  upload.single("image"),
  updateProduct
);

export default router;
