import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import axiosInstance from "../interceptors/interceptor";
import { loaderStyle } from "../styledComponents/StyledComponent";

type OrderState = {
  orderId: number;
  userId: number;
  totalAmount: string;
  orderStatus: string;
  createdAt: string;
  orderItemId: number;
  productId: number;
  quantity: number;
  title: number;
};

const ViewOrders1 = () => {
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const decodedToken = token
    ? jwtDecode<{ id: string; role: string }>(token)
    : { id: null, role: null };

  //set and get order data
  const [orderData, setOrderData] = useState<OrderState[]>([]);

  const viewOrder = async () => {
    try {
      const response = await axiosInstance.get("order/get-orders");
      setOrderData(response.data.data);
      setLoading(false);
    } catch (err) {
      //   console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    viewOrder();
  }, [decodedToken.id]);

  return (
    <>
      <Grid container sx={{ display: "flex", gap: 1 }}>
        {loading ? (
          <Box style={loaderStyle}></Box>
        ) : orderData && orderData.length > 0 ? (
          orderData.map((product, index) => (
            <Grid item sx={{ width: "100%" }}>
              <Card>
                <CardContent>
                  <Typography variant="body1">
                    Product Name:
                    {product.title}
                  </Typography>
                  <Typography variant="body2">
                    Quantity:{product.quantity}
                  </Typography>
                  <Typography variant="body2">
                    Order status: {product.orderStatus}
                  </Typography>
                  <Typography variant="body2">
                    ${product.totalAmount}
                  </Typography>
                  <Typography variant="body2">
                    Order placed at:{product.createdAt}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <p>No orders found</p>
        )}
      </Grid>
    </>
  );
};
export default ViewOrders1;
