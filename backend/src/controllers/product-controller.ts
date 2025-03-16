import { NextFunction, Request, Response } from "express";
import {
  getReviewsService,
  postReviewService,
} from "../services/product-service";
import { product, ReviewData, reviewData } from "../models/product-model";
import { CustomError } from "../errorObject";

/*********bulk fetch n stre**** */
// static async storeProducts(req: Request, res: Response): Promise<any> {
//   try {
//     const products: product[] = req.body;
//     if (!Array.isArray(products)) {
//       return res.status(400).json({
//         message: "Invalid data format. Expected an array of products.",
//         success: false,
//       });
//     }

//     const formattedProducts = products.map((product) => ({
//       id: product.id,
//       title: product.title,
//       description: product.description,
//       category: product.category,
//       price: product.price,
//       rating: product.rating,
//       stock: product.stock,
//       reviews: product.reviews || [],
//       images: product.images || [],
//     }));
//     const storedProducts = await Promise.all(
//       formattedProducts.map(async (product) => {
//         return await ProductService.storeProducts(product);
//       })
//     );
//     const failedProducts = storedProducts.filter((p) => !p.success);
//     if (failedProducts.length > 0) {
//       return res.status(400).json({
//         message: "Some products failed",
//         success: false,
//         failedProducts,
//       });
//     }
//     res
//       .status(201)
//       .json({ message: "Products stored successfully", success: true });
//   } catch (error) {
//     console.error("Error storing products:", error);
//     res.status(500).json({ message: "Internal Server err" });
//   }
// }
// static async getProducts(req: Request, res: Response): Promise<any> {
//   try {
//     const result = await ProductService.getProducts();
//     if (result.success) {
//       res.status(200).json(result);
//     }
//   } catch (err) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// }

export const postReview = async (req: Request, res: Response,next: NextFunction): Promise<any> => {
  try {
    console.log(req.body)
    await postReviewService(req.body as ReviewData);
    return res.status(201).json({ message: "Review added successfully" });
  } catch (err: any) {
    next(err)
  }
};

export const getReviews = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const id: string = req.params.id;

    const productId = parseInt(id, 10);

    const productResponse = await getReviewsService(productId);

    return res.status(200).json({
      message: "Reviews fetched successfully",
      data: productResponse,
    });
  } catch (err: any) {
    next(err)
  }
};
