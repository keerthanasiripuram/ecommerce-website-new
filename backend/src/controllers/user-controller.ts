import { NextFunction, Request, Response } from "express";
import { getFilteredProductsService, getProductByIdService, getProductsService, getUserService, updateProfileService } from "../services/user-service";
import { User } from "../models/user-model";
import { CustomError } from "../errorObject";
import { CustomRequest } from "../middlewares/token-role-verification";

export const getUser = async (
  req: CustomRequest,
  res: Response
): Promise<any> => {
  const userId = Number(req.id);

  try {
    const userResponse = await getUserService(userId);

    return res.status(200).json({
      message: "User Data fetched successfully",
      data: userResponse,
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

export const updateProfile = async (
  req: CustomRequest,
  res: Response
): Promise<any> => {
  const userId = Number(req.id);

  const { name, email, mobile_number, role, address }: User = req.body;
  //wt abt remng in User , also can we nt pass as req.body as
  try {
    const user_response = await updateProfileService(userId, {
      name,
      email,
      mobile_number,
      role,
      address,
    });

    return res.status(200).json({
      message: "User profile updated successfully",
      data: user_response,
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

export const getProducts = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const userResponse = await getProductsService();

    return res.status(200).json({
      message: "prodcurs fetched successfully",
      data: userResponse,
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

export const getProductById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const productId = Number(req.params.id);

    const userResponse = await getProductByIdService(productId);

    return res.status(200).json({
      message: "prodcurs fetched successfully",
      data: userResponse,
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

export const getFilteredProducts = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const category = req.query.category as string;

    const title = req.query.searchquery
      ? (req.query.searchquery as string)
      : "";

    const rating = req.query.rating as string;

    const priceRange = req.query.pricerange as string;

    const convertedRating = Number(rating);

    const minPrice = Number(priceRange.split(",")[0]);

    const maxPrice = Number(priceRange.split(",")[1]);

    const currentPage = req.query.page as string;

    const convertedCurrPage = Number(currentPage);

    const user_response = await getFilteredProductsService({
      category,
      title,
      convertedRating,
      minPrice,
      maxPrice,
      convertedCurrPage,
    });

    return res.status(200).json({
      message: "filtered prodcurs fetched successfully",
      data: user_response,
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
