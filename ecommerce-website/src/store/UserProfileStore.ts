import { create } from "zustand";

interface UserProfileData {
  name: string;
  email: string;
  mobilenumber: string;
  password: string;
  confirmPassword: string;
  role: string;
  address: string;
}

interface UserProfileStore {
  userProfileData: UserProfileData;
  setData: (field: keyof UserProfileData, value: string) => void;
}

export const useUserProfile = create<UserProfileStore>((set) => ({
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
