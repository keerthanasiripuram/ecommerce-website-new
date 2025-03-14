export interface Order {
  id?: number;
  userId: number;
  productIdArr: Array<{ id: number; quantity: number }>;
  totSum: number;
  status?: string;
  created_at?: Date;
}

export interface ChangeStatus{
  orderStatus: string;
  userId: number;
  productId: number;
  orderId: number;
  quantity: number;
}
