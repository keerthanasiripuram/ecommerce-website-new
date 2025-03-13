import pool from "../db";
import { CustomError } from "../errorObject";
import {
  fetch_user_data,
  product_state,
  User,
  user_login_data,
} from "../models/user-model";

export const create_user_db = async (user: User): Promise<User> => {
  const client = await pool.connect();

  try {
    const { name, email, mobile_number, password, role, address } = user;

    const query = `INSERT INTO "users" (name,email,mobileNumber,password,role,address) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`;

    const result = await client.query(query, [
      name,
      email,
      mobile_number,
      password,
      role,
      address,
    ]);

    if (result.rowCount === 0) {
      throw new CustomError("User creation failed", 401);
    }

    return result.rows[0];
  } catch (err: any) {
    if (err.code) {
      console.error("Database error:", err);

      throw new CustomError("Database error occurred", 500);
    }
    throw err;
  } finally {
    client.release();
  }
};

export const check_user_db = async ({
  name,
  email,
}: {
  name: string;
  email: string;
}): Promise<User> => {
  const client = await pool.connect();

  try {
    const query = `SELECT * FROM "users" WHERE name = $1 AND email=$2`;

    const result = await client.query(query, [name, email]);

    if (result.rowCount !== 0) {
      throw new CustomError("User already exists", 409);
    }

    return result.rows[0];
  } catch (err: any) {
    if (err.code) {
      console.error("Database error:", err);

      throw new CustomError("Database error occurred", 500);
    }
    throw err;
  } finally {
    client.release();
  }
};

export const login_user_db = async (user: {
  email: string;
  password: string;
}): Promise<user_login_data> => {
  const client = await pool.connect();

  try {
    const { email, password } = user;

    const query = `SELECT id, role, password FROM "users" WHERE email=$1`;

    const result = await pool.query(query, [email]);

    if (result.rowCount === 0) {
      throw new CustomError("User doesn't exist", 404);
    }

    return result.rows[0];
  } catch (err: any) {
    if (err.code) {
      console.error("Database error:", err);

      throw new CustomError("Database error occurred", 500);
    }
    throw err;
  } finally {
    client.release();
  }
};

export const fetch_user_db = async (id: Number): Promise<fetch_user_data> => {
  const client = await pool.connect();

  try {
    const query = `SELECT name,email,mobileNumber,role,address FROM "users" WHERE id=$1`;

    const result = await pool.query(query, [id]);

    if (result.rowCount === 0) {
      throw new CustomError("User doesn't exist", 404);
    }

    return result.rows[0];
  } catch (err: any) {
    if (err.code) {
      console.error("Database error:", err);

      throw new CustomError("Database error occurred", 500);
    }
    throw err;
  } finally {
    client.release();
  }
};

export const update_profile_db = async (
  id: Number,
  user: {
    name: string;
    email: string;
    mobile_number: string;
    role: string;
    address: string;
  }
): Promise<fetch_user_data> => {
  const client = await pool.connect();

  try {
    const { name, email, mobile_number, role, address } = user;

    const query = `UPDATE "users" SET name=$1 , email=$2,mobileNumber=$3,role=$4,address=$5 
            WHERE id=$6
            RETURNING *`;

    const result = await pool.query(query, [
      name,
      email,
      mobile_number,
      role,
      address,
      id,
    ]);

    if (result.rowCount === 0) {
      throw new CustomError("User profile updation got failed", 400);
    }
    return result.rows[0];
  } catch (err: any) {
    if (err.code) {
      console.error("Database error:", err);
      throw new CustomError("Database error occurred", 500);
    }

    throw err;
  } finally {
    client.release();
  }
};

export const view_product_db = async (): Promise<product_state[]> => {
  const client = await pool.connect();

  try {
    const query = `SELECT * FROM "products2"`;

    const result = await client.query(query);

    if (result.rowCount === 0) {
      throw new CustomError("products fetch failed", 404);
    }
    return result.rows;
  } catch (err: any) {
    if (err.code) {
      console.error("Database error:", err);

      throw new CustomError("Database error occurred", 500);
    }
    throw err;
  } finally {
    client.release();
  }
};

export const view_product_by_id_db = async (
  product_id: number
): Promise<product_state> => {
  const client = await pool.connect();

  try {
    const query = `SELECT * FROM "products2"  where id=$1`;

    const result = await client.query(query, [product_id]);

    if (result.rowCount === 0) {
      throw new CustomError("products fetch failed", 404);
    }

    return result.rows[0];
  } catch (err: any) {
    if (err.code) {
      console.error("Database error:", err);

      throw new CustomError("Database error occurred", 500);
    }
    throw err;
  } finally {
    client.release();
  }
};

export const filtered_product_db = async ({
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
  const client = await pool.connect();

  try {
    const page_size = 2;

    const offset = (converted_curr_page - 1) * page_size;

    const len_query = `SELECT * FROM "products2" where category=$1 and title ILIKE $2 and rating<=$3 and price between $4 and $5`;

    const tot_products = await client.query(len_query, [
      category,
      `%${title}%`,
      converted_rating,
      min_price,
      max_price,
    ]);

    const tot_len = tot_products.rowCount;

    const filtered_query = `SELECT * FROM "products2" where category=$1 and title ILIKE $2 and rating<=$3 and price between $4 and $5 LIMIT $6 OFFSET $7`;

    const result = await client.query(filtered_query, [
      category,
      `%${title}%`,
      converted_rating,
      min_price,
      max_price,
      page_size,
      offset,
    ]);

    if (result.rowCount === 0) {
      throw new CustomError("No products found with the applied filters", 404);
    }

    return { rows: result.rows, tot_len };
  } catch (err: any) {
    if (err.code) {
      console.error("Database error:", err);
      throw new CustomError("Database error occurred", 500);
    }

    throw err;
  } finally {
    client.release();
  }
};
