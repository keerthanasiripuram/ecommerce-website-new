import { ProductState } from "../models/product-model";
import {
  deleteProductFromRepo,
  getProductsFromRepo,
  postProductToRepo,
  updateProductInRepo,
} from "../repositories/admin-repository";

export const postProductService = async (
  productData: ProductState
): Promise<ProductState> => {
  try {
    const postedProduct = await postProductToRepo(productData);
    return postedProduct;
  } catch (err) {
    throw err;
  }
};

export const getProductsService = async (): Promise<ProductState[]> => {
  try {
    const products = await getProductsFromRepo();
    return products;
  } catch (err) {
    throw err;
  }
};

export const deleteProductService = async (
  productId: number
): Promise<ProductState> => {
  try {
    const deletedProduct = await deleteProductFromRepo(productId);
    return deletedProduct;
  } catch (err) {
    throw err;
  }
};

export const updateProductService = async (
  productData: ProductState
): Promise<ProductState> => {
  try {
    const updatedProduct = await updateProductInRepo(productData);
    return updatedProduct;
  } catch (err) {
    throw err;
  }
};
