import { Request, Response } from "express";
import {
  add_review_service,
  view_reviews_service,
} from "../services/product-service";
import { product, reviewData } from "../models/product-model";
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

export const add_review = async (req: Request, res: Response): Promise<any> => {
  try {
    const { reviewer_name, reviewer_email, rating, comment, id }: reviewData =
      req.body;

    const product_response = await add_review_service({
      reviewer_name,
      reviewer_email,
      rating,
      comment,
      id,
    });

    return res.status(201).json({ message: "Revie added successfully" });
  } catch (err: any) {
    if (err instanceof CustomError) {
      return res.status(err.statusCode).json({
        message: err.message,
      });
    }

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const view_reviews = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const id: string = req.params.id;

    const productId = parseInt(id, 10);

    const product_response = await view_reviews_service(productId);

    return res.status(200).json({
      message: "Revies fetched successfully",
      data: product_response,
    });
  } catch (err: any) {
    if (err instanceof CustomError) {
      return res.status(err.statusCode).json({
        message: err.message,
      });
    }

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
