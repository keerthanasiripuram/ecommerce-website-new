import pool from "../db";
import { CustomError } from "../errorObject";
import { ProductState } from "../models/product-model";
import { FetchUser, FilteredQuery, User } from "../models/user-model";



export const checkUser = async ({
  name,
  email,
}: {
  name: string;
  email: string;
}): Promise<User> => {
  console.log(name)
  const client = await pool.connect();
  const query = `SELECT * FROM "users" WHERE name = $1 AND email=$2`;

  const result = await client.query<User>(query, [name, email]);
  console.log(result)
  client.release();
  return result.rows[0];
};



export const getUserFromRepo = async (id: Number): Promise<FetchUser> => {
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

export const updateProfileRepo = async (
  id: Number,
  user: {
    name: string;
    email: string;
    mobile_number: string;
    role: string;
    address: string;
  }
): Promise<FetchUser> => {
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
    //ftchng whle but dat fetchuser also few feilds
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

export const getProductsFromRepo = async (): Promise<ProductState[]> => {
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

export const getProductByIdRepo = async (
  product_id: number
): Promise<ProductState> => {
  const client = await pool.connect();

  try {
    const query = `SELECT * FROM "products"  where id=$1`;

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

export const getFilteredProducts = async (filteredQuery: FilteredQuery): Promise<any> => {
  const client = await pool.connect();

  try {
    const pageSize = 2;
    const { category,title,convertedRating,minPrice,maxPrice,convertedCurrPage}= filteredQuery
    const offset = (convertedCurrPage - 1) * pageSize;

    const len_query = `SELECT * FROM "products" where category=$1 and title ILIKE $2 and rating<=$3 and price between $4 and $5`;

    const totProducts = await client.query(len_query, [
      category,
      `%${title}%`,
      convertedRating,
      minPrice,
      maxPrice,
    ]);

    const totLen = totProducts.rowCount;

    const query = `SELECT * FROM "products" where category=$1 and title ILIKE $2 and rating<=$3 and price between $4 and $5 LIMIT $6 OFFSET $7`;

    const result = await client.query(query, [
      category,
      `%${title}%`,
      convertedRating,
      minPrice,
      maxPrice,
      pageSize,
      offset,
    ]);

    if (result.rowCount === 0) {
      throw new CustomError("No products found with the applied filters", 404);
    }

    return { rows: result.rows, totLen };
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
