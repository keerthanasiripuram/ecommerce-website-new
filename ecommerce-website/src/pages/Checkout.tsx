import React, { useCallback, useMemo, useState } from "react";
import {
  Card,
  Typography,
  Button,
  Modal,
  Box,
  IconButton,
  RadioGroup,
  FormControlLabel,
  Radio,
  Snackbar,
  Alert,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import Registration from "./Registration";
import { useCart } from "../store/UseCartStore";
import axiosInstance from "../interceptors/interceptor";
import CustomSnackBar from "../customFields/CustomSnackBar";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 1,
  maxHeight: "80vh",
  overflowY: "auto",
};

const Checkout = () => {
  const navigate = useNavigate();

  //cart Data and it's operations
  const cartData = useCart((state) => state.cartData);

  const clearCartData = useCart((state) => state.clearCartData);

  const handleOrder = async () => {
    try {
      const response = await axiosInstance.post("order/post-order", {
        productIdArr,
        totSum,
      });

      showSuccess(response.data.message);
      navigate("/profile");
      clearCartData();
    } catch (err: any) {
      showError(err.response.data.message);
      console.log(err);
    }
  };

  const totSum = useMemo(() => {
    return cartData.reduce((tot, ele) => tot + ele.price * ele.quantity, 0);
  }, [cartData]);

  let productIdArr: Array<{ id: number; quantity: number }> = cartData.map(
    (product) => ({ id: product.id, quantity: product.quantity }),
  );

  //modal handlers
  const handleOpen = useCallback(() => setOpen(true), []);

  const handleClose = useCallback(() => setOpen(false), []);

  //snackbar to display sttaus
  const [open, setOpen] = React.useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);

  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "error",
  );

  const showError = useCallback((msg: string) => {
    setSnackbarMessage(msg);
    setSnackbarOpen(true);
    setSnackbarSeverity("error");
  }, []);

  const showSuccess = useCallback((msg: string) => {
    setSnackbarMessage(msg);
    setSnackbarOpen(true);
    setSnackbarSeverity("success");
  }, []);

  const handleCloseSnackbar = useCallback(
    (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === "clickaway") return;
      setSnackbarOpen(false);
    },
    [],
  );

  return (
    <>
      <Typography variant="h1" style={{ textAlign: "center" }}>
        CheckOut Page
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "500px",
          margin: "auto",
          gap: "5px",
          padding: "10px",
        }}
      >
        <Typography variant="h6">Order Amount: ${totSum}</Typography>
        <Card style={{ marginTop: "5px", padding: "5px", gap: "20px" }}>
          <Typography variant="h6"> Add delivery Address</Typography>
          <Button
            variant="contained"
            onClick={handleOpen}
            sx={{ borderRadius: "5px", marginTop: "5px" }}
          >
            Add Delivery address
          </Button>
        </Card>
        <Card style={{ marginTop: "5px", padding: "5px" }}>
          <Typography variant="h6"> Choose payment mode:</Typography>
          <RadioGroup aria-labelledby="demo-controlled-radio-buttons-group">
            <FormControlLabel
              value="UPI"
              control={<Radio />}
              label="UPI Payments"
            />
            <FormControlLabel
              value="credit-card"
              control={<Radio />}
              label="Credit card"
            />
          </RadioGroup>
        </Card>
        <Button
          variant="contained"
          onClick={handleOrder}
          style={{ borderRadius: "5px" }}
        >
          proceed
        </Button>
      </Box>

      {/* snackbar to hndle err msgs */}
      {/* <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar> */}
              <CustomSnackBar
        message={snackbarMessage}
        severity={snackbarSeverity}
        open={snackbarOpen}
        onClose={handleCloseSnackbar}
      />
      
      {/* modal to enter/update address */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton
            onClick={handleClose}
            style={{
              position: "absolute",
              top: 8,
              right: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
          <Registration onClose={handleClose} />
        </Box>
      </Modal>
    </>
  );
};

export default Checkout;
