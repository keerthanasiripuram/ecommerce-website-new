import express from "express";
import { add_review, view_reviews } from "../controllers/product-controller";
import { verify_token } from "../middlewares/token-role-verification";

const router = express.Router();

router.post("/add-review", verify_token, add_review);

router.get("/view-reviews/:id", view_reviews);

export default router;
