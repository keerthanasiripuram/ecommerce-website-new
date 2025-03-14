import pool from "../db";
import { CustomError } from "../errorObject";
import { ProductState } from "../models/product-model";

export const postProductToRepo = async (
  productData: ProductState
): Promise<ProductState> => {
  const client = await pool.connect();

  try {
    const query = `INSERT INTO "products" (title,description,category,price,rating,stock,image) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`;

    const result = await client.query(query, [
      productData.title,
      productData.description,
      productData.category,
      productData.price,
      productData.rating,
      productData.stock,
      productData.image,
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

export const getProductsFromRepo= async (): Promise<ProductState[]> => {
  const client = await pool.connect();

  try {
    const query = `SELECT * FROM "products"`;

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

export const updateProductInRepo = async (
  productData: ProductState
): Promise<ProductState> => {
  const client = await pool.connect();

  try {
    const query = `UPDATE "products" SET  title=$1,category=$2,description=$3,price=$4 , rating=$5,stock=$6,image=$7
            WHERE id=$8
            RETURNING *`;

    const result = await client.query(query, [
      productData.title,
      productData.category,
      productData.description,
      productData.price,
      productData.rating,
      productData.stock,
      productData.image,
      productData.id,
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

export const deleteProductFromRepo = async (
  productId: number
): Promise<ProductState> => {
  const client = await pool.connect();

  try {
    const query = `DELETE FROM "products" where id=$1`;

    const result = await client.query(query, [productId]);

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
