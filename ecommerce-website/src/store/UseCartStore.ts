import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartData {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  image: String;
  quantity: number;
}

interface CartStore {
  cartData: CartData[];
  setCartData: (data: CartData) => void;
  removeCartData: (id: number) => void;
  clearCartData: () => void;
}

export const useCart = create<CartStore>()(
  persist(
    (set) => ({
      cartData: [],

      setCartData: (newProduct) =>
        set((state) => {
          const productExists = state.cartData.find(
            (ele) => ele.id === newProduct.id,
          );
          let updatedCart;
          if (productExists) {
            updatedCart = state.cartData.map((ele) =>
              ele.title === newProduct.title
                ? { ...ele, quantity: ele.quantity + 1 }
                : ele,
            );
          } else {
            updatedCart = [...state.cartData, { ...newProduct, quantity: 1 }];
          }
          return { cartData: updatedCart };
        }),

      removeCartData: (id) =>
        set((state) => {
          let updatedCart;
          const productExists = state.cartData.find((ele) => ele.id === id);
          if (productExists && productExists.quantity > 1) {
            updatedCart = state.cartData.map((ele) =>
              ele.id === id ? { ...ele, quantity: ele.quantity - 1 } : ele,
            );
          } else {
            updatedCart = state.cartData.filter((item) => item.id !== id);
          }
          return { cartData: updatedCart };
        }),

      clearCartData: () =>
        set((state) => {
          return { cartData: [] };
        }),
    }),

    {
      name: "cart-store",
    },
  ),
);
