export interface User {
  id?:number;
  name: string;
  email: string;
  mobile_number: string;
  password: string;
  confirm_password: string;
  role: string;
  address: string;
  created_at?:Date;
}

export type UserLogin = {
  id: number;
  role: string;
  password: string;
};

export type FetchUser = {
  name: string;
  email: string;
  role: string;
  mobileNumber: string;
  address: string;
};

export type FilteredQuery={
  category?: string;
  title: string;
  convertedRating: number;
  minPrice: number;
  maxPrice: number;
  convertedCurrPage: number;
}

