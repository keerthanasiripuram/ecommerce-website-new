import pool from "../db";
import { CustomError } from "../errorObject";

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

export const add_product_db = async (
  product_data: product_state
): Promise<product_state> => {
  const client = await pool.connect();

  try {
    const query = `INSERT INTO "products2" (title,description,category,price,rating,stock,images) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`;

    const result = await client.query(query, [
      product_data.title,
      product_data.description,
      product_data.category,
      product_data.price,
      product_data.rating,
      product_data.stock,
      product_data.images,
    ]);

    if (result.rowCount === 0) {
      throw new CustomError("product creation failed", 401);
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

export const update_product_db = async (
  product_data: product_state
): Promise<product_state> => {
  const client = await pool.connect();

  try {
    const query = `UPDATE "products2" SET  title=$1,category=$2,description=$3,price=$4 , rating=$5,stock=$6,images=$7
            WHERE id=$8
            RETURNING *`;

    const result = await client.query(query, [
      product_data.title,
      product_data.category,
      product_data.description,
      product_data.price,
      product_data.rating,
      product_data.stock,
      product_data.images,
      product_data.id,
    ]);

    if (result.rowCount === 0) {
      throw new CustomError("product updation failed", 400);
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

export const delete_product_db = async (
  product_id: number
): Promise<product_state> => {
  const client = await pool.connect();

  try {
    const query = `DELETE FROM "products2" where id=$1`;

    const result = await client.query(query, [product_id]);

    if (result.rowCount === 0) {
      throw new CustomError("product deletion failed", 400);
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
