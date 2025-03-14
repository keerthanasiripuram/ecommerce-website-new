import { getReviewsFromRepo, postReviewToRepo } from "../repositories/product-repository";
import { product, readViewData, ReviewData, reviewData } from "../models/product-model";
export const postReviewService = async (
  reviewData: ReviewData
): Promise<any> => {
  console.log(reviewData)
    const productData = await postReviewToRepo(reviewData);
    return productData;
};

export const getReviewsService = async (
  productId: number
): Promise<ReviewData[]> => {
    const productData = await getReviewsFromRepo(productId);
    if(!productData)
    {
      throw new Error("NOT_FOUND");
    }
    return productData;
  };
