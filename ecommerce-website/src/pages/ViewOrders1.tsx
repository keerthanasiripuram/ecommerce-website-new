import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import axiosInstance from "../interceptors/interceptor";

type orderState = {
  order_id: number;
  user_id: number;
  total_amount: string;
  order_status: string;
  created_at: string;
  order_item_id: number;
  product_id: number;
  quantity: number;
  title: number;
};

const style = {
  borderRadius: "50%",
  height: "25px",
  width: "25px",
  margin: "auto",
  marginTop: "15px",
  border: "2px solid blue",
  borderTopColor: "transparent",
  animation: "spin 1s linear infinite",
  "@keyframes spin": {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
  },
};

const ViewOrders1 = () => {
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const decodedToken = token
    ? jwtDecode<{ id: string; role: string }>(token)
    : { id: null, role: null };

  //set and get order data
  const [orderData, setOrderData] = useState<orderState[]>([]);

  const viewOrder = async () => {
    try {
      const response = await axiosInstance.get("order/view-order");
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
          <Box style={style}></Box>
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
                    Order status: {product.order_status}
                  </Typography>
                  <Typography variant="body2">
                    ${product.total_amount}
                  </Typography>
                  <Typography variant="body2">
                    Order placed at:{product.created_at}
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
