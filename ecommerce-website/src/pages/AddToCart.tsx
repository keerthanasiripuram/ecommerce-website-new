import { useMemo, useCallback } from "react";
import { useCart } from "../store/UseCartStore";
import { Typography, Button, Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../store/UseProductStore";
import Header from "../components/Header";

const AddToCart = () => {
  const ProductData = useProduct((state) => state.productData);

  //cartData and its opertns
  const CartData = useCart((state) => state.cartData);
  const totSum = useMemo(() => {
    return CartData.reduce((tot, ele) => tot + ele.price * ele.quantity, 0);
  }, [CartData]);

  const removeCartData = useCart((state) => state.removeCartData);
  const handleRemoveCart = useCallback((id: number) => {
    removeCartData(id);
  }, []);

  const setCartData = useCart((state) => state.setCartData);
  // const handleAddToCart = useCallback((id: number) => {
  //   const filteredProduct = ProductData.find(
  //     (product) => product.id == Number(id),
  //   );
  //   if (!filteredProduct) return alert("product not found");
  //   setCartData({ ...filteredProduct, quantity: 1 });
  // }, []);

  //navigate based on token
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const checkNavigation = () => {
    if (token) {
      navigate("/checkout");
    } else {
      alert("please login to continue");
    }
  };

  // Define Columns
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Product Title", width: 200 },
    { field: "price", headerName: "Price ($)", width: 100 },
    { field: "quantity", headerName: "Quantity", width: 100 },
    {
      field: "remove",
      headerName: "Remove",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          onClick={() => handleRemoveCart(params.row.id)}
        >
          Remove
        </Button>
      ),
    },
    {
      field: "increment",
      headerName: "Increment",
      width: 150,
      // renderCell: (params) => {
      //   const cartProduct = CartData.find((item) => item.id === params.row.id);
      //   const product = ProductData.find((item) => item.id === params.row.id);
      //   const isDisabled =
      //     cartProduct && product && cartProduct.quantity >= product.stock;
      //   return (
      //     <Button
      //       variant="contained"
      //       color="primary"
      //       disabled={isDisabled}
      //       onClick={() => handleAddToCart(params.row.id)}
      //     >
      //       {isDisabled ? "out of stock" : "Increment"}
      //     </Button>
      //   );
      // },
    },
  ];

  return (
    <>
      <Header enable={false} />
      <Box
        sx={{
          height: "400px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          margin: "auto",
          padding: "5px",
        }}
      >
        <Typography variant="h5">Shopping Cart</Typography>
        {/* Material UI Virtualized Table */}
        <div style={{ display: "flex", flexDirection: "column", width: "90%" }}>
          <DataGrid
            rows={CartData}
            columns={columns}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
            autoHeight
          />
        </div>

        {/* Summary & Checkout Button */}
        <Typography variant="h6">Total Price: ${totSum}</Typography>
        <Typography variant="h6">
          No. of Cart Items: {CartData.length}
        </Typography>
        {CartData.length > 0 && (
          <Button variant="contained" color="primary" onClick={checkNavigation}>
            Proceed to Buy
          </Button>
        )}
      </Box>
    </>
  );
};

export default AddToCart;
