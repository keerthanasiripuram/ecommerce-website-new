import pool from "../db";
import { CustomError } from "../errorObject";
import { ChangeStatus, Order } from "../models/order-model";

export const getOrdersRepo = async (user_id: Number): Promise<Order[]> => {
  const client = await pool.connect();

  try {
    const query = `SELECT o.order_id AS orderId,o.user_id,o.total_amount, o.order_status as orderStatus, o.created_at as createdAt, 
            oi.order_item_id AS order_item_id,
            oi.product_id,
            oi.quantity ,
            p.title
            FROM "orders" o
            LEFT JOIN "order_items" oi ON o.order_id=oi.order_id
            LEFT JOIN 
            "products" p ON oi.product_id = p.id
            WHERE o.user_id = $1`;

    const result = await client.query(query, [user_id]);

    if (result.rowCount === 0) {
      throw new CustomError("Orders not found", 404);
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

export const orderProductsRepo = async (order: Order): Promise<Order[]> => {
  const client = await pool.connect();

  const { userId, productIdArr, totSum } = order;

  try {
    await client.query("BEGIN");

    const query = `INSERT INTO "orders" (user_id,total_amount,order_status) VALUES ($1,$2,'PENDING') RETURNING order_id`;

    const result = await client.query(query, [userId, totSum]);

    if (result.rowCount === 0) {
      throw new CustomError("Order creation failed", 401);
    }

    const orderId = Number(result.rows[0].order_id);

    const insertItemsQuery = `INSERT INTO "order_items" (order_id,product_id,quantity) VALUES ($1,$2,$3) RETURNING *`;

    productIdArr.forEach(async (element) => {
      const productId = element.id;
      const productQuantity = element.quantity;
      const result = await client.query(insertItemsQuery, [
        orderId,
        productId,
        productQuantity,
      ]);

      if (result.rowCount === 0) {
        throw new CustomError("Order creation failed", 401);
      }
    });

    await client.query("COMMIT");

    return result.rows;
  } catch (err: any) {
    await client.query("ROLLBACK");

    if (err.code) {
      console.error("Database error:", err);
      throw new CustomError("Database error occurred", 500);
    }

    throw err;
  } finally {
    client.release();
  }
};

export const getOrdersByAdminRepo = async (): Promise<Order[]> => {
  const client = await pool.connect();

  try {
    const query = `SELECT o.order_id AS order_id,o.user_id,o.total_amount, o.order_status, o.created_at, 
            oi.order_item_id AS order_item_id,
            oi.product_id,
            oi.quantity,
            p.title
            FROM "orders" o
            LEFT JOIN "order_items" oi ON o.order_id=oi.order_id
            LEFT JOIN 
            "products" p ON oi.product_id = p.id;`;

    const result = await client.query(query);

    if (result.rowCount === 0) {
      throw new CustomError("Orders not found", 404);
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

export const changeOrderStatusRepo = async (changeStatusData:ChangeStatus): Promise<Order[]> => {
  const client = await pool.connect();
  const {orderStatus,
    userId,
    productId,
    orderId,
    quantity}=changeStatusData
  try {
    await client.query("BEGIN");

    const query = `UPDATE orders SET order_status=$1
            WHERE order_id=$2
            AND user_id=$3
            AND EXISTS(
            SELECT 1 FROM "order_items" oi
            WHERE oi.order_id=order_id
            AND oi.product_id=$4
            ) RETURNING *`;

    const result = await client.query(query, [
    orderStatus,
      orderId,
      userId,
      productId
    ]);

    if (result.rowCount === 0) {
      throw new CustomError("Status updation failed", 400);
    }

    const updateProductQuantityQuery = `UPDATE products SET stock=stock-$1
            WHERE id = $2 RETURNING *`; 

    const updateResult = await client.query(updateProductQuantityQuery, [
      quantity,
      productId,
    ]);

    if (updateResult.rowCount == 0) {
      throw new CustomError("Status updation failed", 400);
    }

    await client.query("COMMIT");

    return updateResult.rows;
  } catch (err: any) {
    await client.query("ROLLBACK");

    if (err.code) {
      console.error("Database error:", err);
      throw new CustomError("Database error occurred", 500);
    }

    throw err;
  } finally {
    client.release();
  }
};

export const cancelOrderRepo = async (changeStatusData:ChangeStatus): Promise<Order[]> => {
  const client = await pool.connect();
  const {orderStatus,
    userId,
    productId,
    orderId,
    quantity}=changeStatusData
  try {
    await client.query("BEGIN");
    const query = `UPDATE orders SET order_status=$1
            WHERE order_id=$2
            AND user_id=$3
            AND EXISTS(
            SELECT 1 FROM "order_items" oi
            WHERE oi.order_id=order_id
            AND oi.product_id=$4
            ) RETURNING *`;

    const result = await client.query(query, [
      orderStatus,
      orderId,
      userId,
      productId
    ]);

    if (result.rowCount === 0) {
      throw new CustomError("Status updation failed", 400);
    }

    const updateProductQuantityQuery = `UPDATE products SET stock=stock+$1
            WHERE id = $2
            RETURNING *`; //mdfied

    const updateResult = await client.query(updateProductQuantityQuery, [
      quantity,
      productId,
    ]);

    if (updateResult.rowCount == 0) {
      throw new CustomError("Status updation failed", 400);
    }

    await client.query("COMMIT");

    return updateResult.rows;
  } catch (err: any) {
    await client.query("ROLLBACK");

    if (err.code) {
      console.error("Database error:", err);
      throw new CustomError("Database error occurred", 500);
    }

    throw err;
  } finally {
    client.release();
  }
};
