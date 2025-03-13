export interface User {
  id?: number;
  name: string;
  email: string;
  mobile_number: string;
  password: string;
  confirm_password: string;
  role: string;
  address: string;
  created_at?: Date;
}

export type user_login_data = {
  id: number;
  role: string;
  password: string;
};

export type fetch_user_data = {
  name: string;
  email: string;
  role: string;
  mobileNumber: string;
  address: string;
};

export type product_state = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  images: string;
};
