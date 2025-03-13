export interface reviewData {
  rating: number;
  comment: string;
  date?: Date;
  reviewer_name: string;
  reviewer_email: string;
  id?: number;
}
export interface readViewData {
  product_id: 10;
  rating: 4;
  comment: string;
  date: Date;
  reviewer_name: string;
  reviewer_email: string;
}
export interface product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  images: string;
  reviews: Array<reviewData>;
  created_at?: Date;
}
