import { create } from "zustand";

export interface reviewData {
  rating: number;
  comment: string;
  date: Date;
  reviewerName: string;
  reviewerEmail: string;
}

export interface productData {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  images: string;
  quantity: number;
  reviews: Array<reviewData>;
}

interface productStore {
  productData: productData[];
  setProductData: (data: productData[]) => void;
}

export const useProduct = create<productStore>()((set) => ({
  productData: [],

  setProductData: (data) => set({ productData: data }),
}));
