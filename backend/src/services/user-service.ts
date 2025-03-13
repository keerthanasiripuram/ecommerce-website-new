import {
  create_user_db,
  check_user_db,
  login_user_db,
  fetch_user_db,
  update_profile_db,
  view_product_db,
  filtered_product_db,
  view_product_by_id_db,
} from "../repositories/user-repository";
import { fetch_user_data, product_state, User } from "../models/user-model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { CustomError } from "../errorObject";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

const secret_key = process.env.SECRET_KEY;

export const register_user_service = async (user: User): Promise<User> => {
  try {
    const check_user = await check_user_db({
      name: user.name,
      email: user.email,
    });

    const salt_rounds = 10;

    const hashed_password = await bcrypt.hash(user.password, salt_rounds);

    const created_user = await create_user_db({
      ...user,
      password: hashed_password,
    });

    return created_user;
  } catch (err) {
    throw err;
  }
};

export const login_user_service = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<any> => {
  try {
    const user_data = await login_user_db({ email, password });

    const is_match = await bcrypt.compare(password, user_data.password);

    if (!is_match) {
      throw new CustomError("Password is incorrect", 401);
    }

    const token = jwt.sign(
      { id: user_data.id, role: user_data.role },
      secret_key!,
      { expiresIn: "1d" }
    );
    return token;
  } catch (err) {
    console.error("Service error:", err);
    throw err;
  }
};

export const fetch_user_service = async (
  user_id: Number
): Promise<fetch_user_data> => {
  try {
    const user_data = await fetch_user_db(user_id);
    return user_data;
  } catch (err) {
    console.error("Service error:", err);
    throw err;
  }
};

export const update_profile_service = async (
  user_id: Number,
  user: {
    name: string;
    email: string;
    mobile_number: string;
    role: string;
    address: string;
  }
): Promise<fetch_user_data> => {
  try {
    const user_data = await update_profile_db(user_id, user);
    return user_data;
  } catch (err) {
    console.error("Service error:", err);
    throw err;
  }
};

export const view_product_service = async (): Promise<product_state[]> => {
  try {
    const view_products = await view_product_db();
    return view_products;
  } catch (err) {
    throw err;
  }
};

export const view_product_by_id_service = async (
  product_id: number
): Promise<product_state> => {
  try {
    const view_product = await view_product_by_id_db(product_id);
    return view_product;
  } catch (err) {
    throw err;
  }
};

export const filtered_product_service = async ({
  category,
  title,
  converted_rating,
  min_price,
  max_price,
  converted_curr_page,
}: {
  category?: string;
  title: string;
  converted_rating: number;
  min_price: number;
  max_price: number;
  converted_curr_page: number;
}): Promise<any> => {
  try {
    const filtered_products = await filtered_product_db({
      category,
      title,
      converted_rating,
      min_price,
      max_price,
      converted_curr_page,
    });

    return filtered_products;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
