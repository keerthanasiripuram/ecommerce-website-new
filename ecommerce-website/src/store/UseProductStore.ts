import { create } from "zustand";

export interface ReviewData {
  rating: number;
  comment: string;
  date: Date;
  reviewerName: string;
  reviewerEmail: string;
}

export interface ProductData {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  images: string;
  quantity: number;
  reviews: Array<ReviewData>;
}

interface ProductStore {
  productData: ProductData[];
  setProductData: (data: ProductData[]) => void;
}

export const useProduct = create<ProductStore>()((set) => ({
  productData: [],

  setProductData: (data) => set({ productData: data }),
}));
