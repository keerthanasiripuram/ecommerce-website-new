import { create } from "zustand";

interface userProfileData {
  name: string;
  email: string;
  mobilenumber: string;
  password: string;
  confirmPassword: string;
  role: string;
  address: string;
}

interface userProfileStore {
  userProfileData: userProfileData;
  setData: (field: keyof userProfileData, value: string) => void;
}

export const useUserProfile = create<userProfileStore>((set) => ({
  userProfileData: {
    name: "",
    email: "",
    mobilenumber: "",
    password: "",
    confirmPassword: "",
    role: "",
    address: "",
  },

  setData: (field, value) =>
    set((state) => {
      const newData = {
        ...state.userProfileData,
        [field]: value,
      };
      return { userProfileData: newData };
    }),
}));
