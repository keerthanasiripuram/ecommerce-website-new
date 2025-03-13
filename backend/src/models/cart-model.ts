import { product } from "./product-model";
export interface CartItem {
  id?: number;
  cartId: number;
  product: product;
  quanity: number;
}
export interface cart {
  id?: number;
  userId: number;
  items: CartItem[];
  totalPrice: number;
  createdAt: Date;
}
