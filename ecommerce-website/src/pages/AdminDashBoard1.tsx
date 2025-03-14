import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import axiosInstance from "../interceptors/interceptor";

type OrderState = {
  orderId: number;
  userId: number;
  totalAmount: string;
  orderStatus: string;
  createdAt: string;
  orderItemId: number;
  productId: number;
  quantity: number;
  title: string;
};

const AdminDashBoard1 = () => {
  const [isLoading, setIsLoading] = useState(true);

  //order dta & its operations
  const [orderData, setOrderData] = useState<OrderState[]>([]);

  useEffect(() => {
    viewOrdersByAdmin();
  }, []);

  const viewOrdersByAdmin = async () => {
    try {
      const response = await axiosInstance.get("order/get-orders-by-admin");
      console.log(response.data.data)
      setOrderData(response.data.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const handleConfirm = async ({
    user_id,
    product_id,
    order_id,
    quantity,
  }: {
    user_id: number;
    product_id: number;
    order_id: number;
    quantity: number;
  }) => {
    try {
      const response = await axiosInstance.put("order/change-order-status", {
        order_status: "CONFIRMED",
        user_id,
        product_id,
        order_id,
        quantity,
      });
      console.log(response);
      viewOrdersByAdmin();
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = async ({
    user_id,
    product_id,
    order_id,
    quantity,
  }: {
    user_id: number;
    product_id: number;
    order_id: number;
    quantity: number;
  }) => {
    try {
      const response = await axiosInstance.put("order/cancel-order", {
        order_status: "CANCEL",
        user_id,
        product_id,
        order_id,
        quantity,
      });
      console.log(response);
      viewOrdersByAdmin();
    } catch (err) {
      console.log(err);
    }
  };

  //filtering prdcts
  let pendingOrders = [];

  pendingOrders = useMemo(() => {
    return orderData.filter((product) => product.orderStatus == "PENDING");
  }, [orderData]);

  let confirmedOrders = [];

  confirmedOrders = useMemo(() => {
    return orderData.filter((product) => product.orderStatus == "CONFIRMED");
  }, [orderData]);

  let cancelledOrders = [];

  cancelledOrders = useMemo(() => {
    return orderData.filter((product) => product.orderStatus == "CANCEL");
  }, [orderData]);

  //select the tab of data grid
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const handleChange = useCallback(
    (event: React.SyntheticEvent, newValue: number) => {
      setSelectedTab(newValue);
    },
    [],
  );

  return (
    <>
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        {/* Tabs */}
        <Tabs value={selectedTab} onChange={handleChange} centered>
          <Tab label="PENDING" />
          <Tab label="CONFIRMED" />
          <Tab label="CANCELED" />
        </Tabs>

        {/* Tab Content */}
        <Box sx={{ p: 3 }}>
          {selectedTab === 0 &&
            (isLoading ? (
              <p>Loading...</p>
            ) : pendingOrders.length > 0 ? (
              pendingOrders.map((product, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                  }}
                >
                  <Card sx={{ marginTop: "20px" }}>
                    <CardContent>
                      <Typography variant="h6">
                        Name:
                        {product.title}
                      </Typography>
                      <Typography variant="body2">
                        Quantity: {product.quantity}
                      </Typography>
                      <Typography variant="body2">
                        Status: {product.orderStatus}
                      </Typography>
                      <Typography variant="body2">
                        Amount: ${product.totalAmount}
                      </Typography>
                      <Button
                        variant="outlined"
                        onClick={() =>
                          handleConfirm({
                            user_id: product.userId,
                            product_id: product.productId,
                            order_id: product.orderId,
                            quantity: product.quantity,
                          })
                        }
                      >
                        Confirm
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">
                No Pending Orders found.
              </Typography>
            ))}

          {selectedTab === 1 &&
            (isLoading ? (
              <p>Loading...</p>
            ) : confirmedOrders.length > 0 ? (
              confirmedOrders.map((product, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                  }}
                >
                  <Card sx={{ marginTop: "20px" }}>
                    <CardContent>
                      <Typography variant="h6">
                        Name:
                        {product.title}
                      </Typography>
                      <Typography variant="body2">
                        Quantity: {product.quantity}
                      </Typography>
                      <Typography variant="body2">
                        Status: {product.orderStatus}
                      </Typography>
                      <Typography variant="body2">
                        Amount: ${product.totalAmount}
                      </Typography>
                      <Button
                        variant="outlined"
                        onClick={() =>
                          handleCancel({
                            user_id: product.userId,
                            product_id: product.productId,
                            order_id: product.orderId,
                            quantity: product.quantity,
                          })
                        }
                      >
                        Cancel
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">
                No Confirmed Orders found.
              </Typography>
            ))}

          {selectedTab === 2 &&
            (isLoading ? (
              <p>Loading...</p>
            ) : cancelledOrders.length > 0 ? (
              cancelledOrders.map((product, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                  }}
                >
                  <Card sx={{ marginTop: "20px" }}>
                    <CardContent>
                      <Typography variant="h6">Name:{product.title}</Typography>
                      <Typography variant="body2">
                        Quantity: {product.quantity}
                      </Typography>
                      <Typography variant="body2">
                        Status: {product.orderStatus}
                      </Typography>
                      <Typography variant="body2">
                        Amount: ${product.totalAmount}
                      </Typography>
                      <Button
                        variant="outlined"
                        onClick={() =>
                          handleConfirm({
                            user_id: product.userId,
                            product_id: product.productId,
                            order_id: product.orderId,
                            quantity: product.quantity,
                          })
                        }
                      >
                        Confirm
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography variant="body2" color="textSecondary">
                No Cancelled Orders found.
              </Typography>
            ))}
        </Box>
      </Box>
    </>
  );
};

export default AdminDashBoard1;
