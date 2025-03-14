import { getFilteredProducts, getProductByIdRepo, getProductsFromRepo, getUserFromRepo, updateProfileRepo } from "../repositories/user-repository";
import {FetchUser,FilteredQuery,User } from "../models/user-model";
import { ProductState } from "../models/product-model";

export const getUserService = async (
  userId: Number
): Promise<FetchUser> => {
  try {
    const userData = await getUserFromRepo(userId);
    return userData;
  } catch (err) {
    console.error("Service error:", err);
    throw err;
  }
};

export const updateProfileService = async (
  userId: Number,
  user: {
    name: string;
    email: string;
    mobile_number: string;
    role: string;
    address: string;
  }
): Promise<FetchUser> => {
  try {
    const userData = await updateProfileRepo(userId, user);
    return userData;
  } catch (err) {
    console.error("Service error:", err);
    throw err;
  }
};

export const getProductsService = async (): Promise<ProductState[]> => {
  try {
    const viewProducts = await getProductsFromRepo();
    return viewProducts;
  } catch (err) {
    throw err;
  }
};

export const getProductByIdService = async (
  productId: number
): Promise<ProductState> => {
  try {
    const viewProduct = await getProductByIdRepo(productId);
    return viewProduct;
  } catch (err) {
    throw err;
  }
};

export const getFilteredProductsService = async (filteredData:FilteredQuery): Promise<any> => {
  try {
    const filteredProducts = await getFilteredProducts(filteredData);

    return filteredProducts;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
