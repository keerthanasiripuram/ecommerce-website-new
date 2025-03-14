import express from "express";
import { verifyToken } from "../middlewares/token-role-verification";
import { getReviews, postReview } from "../controllers/product-controller";

const router = express.Router();

router.post("/post-review", verifyToken, postReview);

router.get("/get-reviews/:id", getReviews);

export default router;
