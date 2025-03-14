import { create } from "zustand";

interface ModalData {
  type: string;
}

interface ModalStore {
  modalData: ModalData;
  setType: (type: string) => void;
}

export const useModal = create<ModalStore>((set) => ({
  modalData: {
    type: "sign-in",
  },

  setType: (type) =>
    set((state) => ({
      modalData: { type },
    })),
}));
