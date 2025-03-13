import {
  add_product_db,
  delete_product_db,
  update_product_db,
  view_product_db,
} from "../repositories/admin-repository";

type product_state = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  images: string;
};

export const add_product_service = async (
  product_data: product_state
): Promise<product_state> => {
  try {
    const created_product = await add_product_db(product_data);
    return created_product;
  } catch (err) {
    throw err;
  }
};

export const view_product_service = async (): Promise<product_state[]> => {
  try {
    const view_product = await view_product_db();
    return view_product;
  } catch (err) {
    throw err;
  }
};

export const delete_product_service = async (
  product_id: number
): Promise<product_state> => {
  try {
    const deleted_product = await delete_product_db(product_id);
    return deleted_product;
  } catch (err) {
    throw err;
  }
};

export const update_product_service = async (
  product_data: product_state
): Promise<product_state> => {
  try {
    const updated_product = await update_product_db(product_data);
    return updated_product;
  } catch (err) {
    throw err;
  }
};
