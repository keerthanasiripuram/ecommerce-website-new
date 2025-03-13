import {
  add_review_db,
  view_reviews_db,
} from "../repositories/product-repository";
import { product, readViewData, reviewData } from "../models/product-model";

export const add_review_service = async (
  reviewData: reviewData
): Promise<any> => {
  try {
    const product_data = await add_review_db(reviewData);
    return product_data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const view_reviews_service = async (
  productId: number
): Promise<readViewData[]> => {
  try {
    const product_data = await view_reviews_db(productId);
    return product_data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
