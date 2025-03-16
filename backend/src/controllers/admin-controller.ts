import { Request, Response } from "express";
import {
  deleteProductService,
  getProductsService,
  postProductService,
  updateProductService,
} from "../services/admin-services";
import { CustomError } from "../errorObject";
import { ProductState } from "../models/product-model";

export const postProduct = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const productData: ProductState = req.body;
    //check id r we gtng by rmvng it in ? in prdcrstate, if nt prsnt thn y is it nt gvng err
    const imagePath = req.file ? req.file.path : null;
    if (imagePath) {
      productData.image = imagePath;
    }

    const adminResponse = await postProductService(productData);

    return res.status(201).json({
      message: "add product successfully",
      data: adminResponse,
    });
  } catch (err: any) {
    console.log(err)
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

export const getProducts = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const adminResponse = await getProductsService();

    return res.status(200).json({
      message: "prodcurs fetched successfully",
      data: adminResponse,
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

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const productId: number = parseInt(req.params.id, 10);

    const adminResponse = await deleteProductService(productId);

    return res.status(200).json({
      message: " product deleted successfully",
      data: adminResponse,
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

export const updateProduct = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const productData: ProductState = req.body;

    const productId: number = parseInt(req.params.id, 10);

    const imagePath = req.file ? req.file.path : null;

    if (imagePath) {
      productData.image = imagePath;
    }

    productData.id = productId;

    const adminResponse = await updateProductService(productData);

    return res.status(200).json({
      message: " product updated successfully",
      data: adminResponse,
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
