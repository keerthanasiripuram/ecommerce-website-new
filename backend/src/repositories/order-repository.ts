import pool from "../db";
import { CustomError } from "../errorObject";
import { Order } from "../models/order-model";

export const view_order_db = async (user_id: Number): Promise<Order[]> => {
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
            "products2" p ON oi.product_id = p.id
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

export const order_products_db = async (order: Order): Promise<Order[]> => {
  const client = await pool.connect();

  const { user_id, product_id_arr, tot_sum } = order;

  try {
    await client.query("BEGIN");

    const query = `INSERT INTO "orders" (user_id,total_amount,order_status) VALUES ($1,$2,'PENDING') RETURNING order_id`;

    const result = await client.query(query, [user_id, tot_sum]);

    if (result.rowCount === 0) {
      throw new CustomError("Order creation failed", 401);
    }

    const order_id = Number(result.rows[0].order_id);

    const insert_items_query = `INSERT INTO "order_items" (order_id,product_id,quantity) VALUES ($1,$2,$3) RETURNING *`;

    product_id_arr.forEach(async (element) => {
      const product_id = element.id;
      const product_quantity = element.quantity;
      const result = await client.query(insert_items_query, [
        order_id,
        product_id,
        product_quantity,
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

export const view_orders_by_admin_db = async (): Promise<Order[]> => {
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
            "products2" p ON oi.product_id = p.id;`;

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

export const change_order_status_db = async (order: {
  order_status: string;
  user_id: number;
  product_id: number;
  order_id: number;
  quantity: number;
}): Promise<Order[]> => {
  const client = await pool.connect();

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
      order.order_status,
      order.order_id,
      order.user_id,
      order.product_id,
    ]);

    if (result.rowCount === 0) {
      throw new CustomError("Status updation failed", 400);
    }

    const update_product_quantity_query = `UPDATE products2 SET stock=stock-$1
            WHERE id = $2 RETURNING *`; //mdfied

    const update_result = await client.query(update_product_quantity_query, [
      order.quantity,
      order.product_id,
    ]);

    if (update_result.rowCount == 0) {
      throw new CustomError("Status updation failed", 400);
    }

    await client.query("COMMIT");

    return update_result.rows;
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

export const cancel_order_db = async (order: {
  order_status: string;
  user_id: number;
  product_id: number;
  order_id: number;
  quantity: number;
}): Promise<Order[]> => {
  const client = await pool.connect();

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
      order.order_status,
      order.order_id,
      order.user_id,
      order.product_id,
    ]);

    if (result.rowCount === 0) {
      throw new CustomError("Status updation failed", 400);
    }

    const update_product_quantity_query = `UPDATE products2 SET stock=stock+$1
            WHERE id = $2
            RETURNING *`; //mdfied

    const update_result = await client.query(update_product_quantity_query, [
      order.quantity,
      order.product_id,
    ]);

    if (update_result.rowCount == 0) {
      throw new CustomError("Status updation failed", 400);
    }

    await client.query("COMMIT");

    return update_result.rows;
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
