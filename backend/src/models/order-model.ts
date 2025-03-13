export interface Order {
  id?: number;
  user_id: number;
  product_id_arr: Array<{ id: number; quantity: number }>;
  tot_sum: number;
  status?: string;
  created_at?: Date;
}
