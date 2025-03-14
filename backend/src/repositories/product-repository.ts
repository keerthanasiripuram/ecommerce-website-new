import pool from "../db";
import { CustomError } from "../errorObject";
import { product, readViewData, ReviewData, reviewData } from "../models/product-model";

//sql queries
/*****bulk store and fetch**********/
// static async storeProducts(
//   product: product
// ): Promise<{ success: boolean; message: string; data?: product }> {
//   const client = await pool.connect();
//   const {
//     id,
//     title,
//     description,
//     category,
//     price,
//     rating,
//     reviews,
//     stock,
//     images,
//   }: product = product;
//   try {
//     const formattedImages = JSON.stringify(images);
//     const query = `INSERT INTO "products" (id,title,description,category,price,rating,stock,images) VALUES ($1,$2,$3,$4,$5,$6,$7,$8::jsonb) RETURNING *`;
//     const result = await client.query(query, [
//       id,
//       title,
//       description,
//       category,
//       price,
//       rating,
//       stock,
//       formattedImages,
//     ]);
//     if (result.rowCount == 0) {
//       return { success: false, message: "Failed to insert Product" };
//     }
//     const productId = Number(result.rows[0].id);
//     const insertItemsQuery = `INSERT INTO "reviews" (product_id,rating,comment,date,reviewer_name,reviewer_email) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`;
//     await Promise.all(
//       reviews.map(async (element) => {
//         const { rating, comment, date, reviewer_name, reviewer_email } =
//           element;
//         await client.query(insertItemsQuery, [
//           productId,
//           rating,
//           comment,
//           date,
//           reviewer_name,
//           reviewer_email,
//         ]);
//       })
//     );

//     return { success: true, message: "Products stored successfully" };
//   } catch (err) {
//     return { success: false, message: "Dabatase err while storing products" };
//   } finally {
//     client.release();
//   }
// }

// static async getProducts(): Promise<product[]> {
//   const client = await pool.connect();
//   try {
//     const query = `
//           SELECT p.id as id,
//           p.title,
//           p.description,
//           p.price,
//           p.rating,
//           p.category,
//           p.stock,
//           p.images,
//           json_agg(
//           jsonb_build_object(
//           'rating',r.rating,
//           'comment',r.comment,
//           'date',r.date,
//           'reviewerName',r.reviewer_name,
//           'reviewerEmail',r.reviewer_email
//           )
//           ) FILTER (WHERE r.id is not null) as reviews
//           FROM products1 p
//           LEFT JOIN reviews1 r ON p.id=r.product_id
//           GROUP BY p.id
//           `;
//     const result = await client.query(query);
//     return result.rows;
//   } catch (err) {
//     throw new CustomError("Database error occurred", 500);
//   } finally {
//     client.release();
//   }
// }
// type LocalReviewData={
//   rating: number;
//   comment: string;
//   date?: Date;
//   reviewerName: string;
//   reviewerEmail: string;
//   id?: number;
// }
export const postReviewToRepo = async (
  reviewData: ReviewData
): Promise<ReviewData> => {
  const client = await pool.connect();

  const { reviewerName, reviewerEmail, rating, comment, id }: ReviewData =
    reviewData;

    const productId = Number(id);
    console.log(productId)
    const query = `INSERT INTO "reviews" (product_id,rating,comment,date,reviewer_name,reviewer_email) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`;

    const result = await client.query<ReviewData>(query, [
      productId,
      rating,
      comment,
      new Date(),
      reviewerName,
      reviewerEmail,
    ]);
    client.release();
    return result.rows[0];
};

export const getReviewsFromRepo = async (
  productId: number
): Promise<ReviewData[]> => {
  const client = await pool.connect();

    const query = `SELECT product_id,rating,comment,date,reviewer_name,reviewer_email FROM "reviews" WHERE product_id = $1`;

    const result = await client.query<ReviewData>(query, [productId]);
    client.release();
    return result.rows;
};
