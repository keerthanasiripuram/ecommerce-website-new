import { create } from "zustand";

interface modalData {
  type: string;
}

interface modalStore {
  modalData: modalData;
  setType: (type: string) => void;
}

export const useModal = create<modalStore>((set) => ({
  modalData: {
    type: "sign-in",
  },

  setType: (type) =>
    set((state) => ({
      modalData: { type },
    })),
}));
