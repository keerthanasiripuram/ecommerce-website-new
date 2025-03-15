import {
  Box,
  Button,
  IconButton,
  Modal,
  Paper,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import axiosInstance from "../interceptors/interceptor";
import AddProduct from "../components/AddProduct";
import CustomModal from "../customFields/CustomModal";
import DisplayProducts from "../components/DisplayProducts";

export type ProductState = {
  id?: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  image: File | null;
};

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

function AdminOperations() {
  const [isUpdate, setIsUpdate] = useState(false);

  const [addProductData, setaddProductData] = useState<ProductState>({
    title: "",
    description: "",
    category: "",
    price: NaN,
    rating: NaN,
    stock: NaN,
    image: null,
  });

  //handle modal
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    viewProducts();
  };

  //view prdcts
  const [productsData, setProductsData] = useState<ProductState[]>();

  const handleAddProduct = () => {
    setIsUpdate(false);
    setOpen(true);
  };

  useEffect(() => {
    viewProducts();
  }, []);

  const viewProducts = async () => {
    try {
      const response = await axiosInstance.get("admin/get-products");
      console.log(response.data.message);
      setProductsData(response.data.data);
    } catch (err: any) {
      console.log(err);
    }
  };

  //api to delete prdct
  const handleDelete = async (id: number) => {
    try {
      const response = await axiosInstance.delete(`admin/delete-product/${id}`);
      viewProducts();
      console.log(response.data.message);
    } catch (err: any) {
      console.log(err);
    }
  };

  //handle updating product
  const [updateProductData, setupdateProductData] = useState<ProductState>({
    title: "",
    description: "",
    category: "",
    price: NaN,
    rating: NaN,
    stock: NaN,
    image: null,
  });

  const handleUpdateProduct = (product: ProductState) => {
    setIsUpdate(true);
    setupdateProductData(product);
    setOpen(true);
  };

  return (
    <>
      <Paper
        sx={{
          padding: 3,
          margin: 2,
          backgroundColor: "#f9f9f9",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h6" align="center" sx={{ mb: 2 }}>
          Admin Operations
        </Typography>

        <Button
          type="submit"
          fullWidth
          color="primary"
          variant="contained"
          sx={{ mt: 2, mb: 2 }}
          onClick={handleAddProduct}
        >
          Add Product
        </Button>

        {/* disly products*/}
        {/* {productsData && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              width: "100%",
            }}
          >
            {productsData.map((product, index) => (
              <div key={index}>
                <div
                  style={{
                    border: "1px solid #ddd",
                    padding: "16px",
                    margin: "10px",
                    borderRadius: "8px",
                    boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
                    backgroundColor: "#fff",
                    maxWidth: "300px",
                    textAlign: "center",
                  }}
                >
                  <p>Id: {product.id}</p>
                  <p>Title: {product.title}</p>
                  <p>Stock: {product.stock}</p>
                  <p>Price: {product.price}</p>
                  <img
                    src={
                      typeof product.image === "string"
                        ? `http://localhost:3001/${product.image}`
                        : ""
                    }
                    alt={product.title}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "200px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginBottom: "16px",
                    }}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    color="primary"
                    variant="contained"
                    sx={{ mt: 2, mb: 2 }}
                    onClick={() => {
                      handleUpdateProduct(product);
                    }}
                  >
                    Edit Product
                  </Button>
                  <Button
                    type="submit"
                    fullWidth
                    color="primary"
                    variant="contained"
                    sx={{ mt: 2, mb: 2 }}
                    onClick={() => {
                      if (product.id) {
                        handleDelete(product.id);
                      }
                    }}
                  >
                    Delete Product
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )} */}
        <DisplayProducts productsData={productsData||[]} handleUpdateProduct={handleUpdateProduct} handleDelete={handleDelete}/>
        {/* shows addprdct/update prdct based on isupdate value */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <IconButton
              onClick={handleClose}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
              }}
            >
              <CloseIcon />
            </IconButton>
            {!isUpdate ? (
              <AddProduct
                data={addProductData}
                isUpdate={isUpdate}
                onClose={handleClose}
              />
            ) : (
              <AddProduct
                data={updateProductData}
                isUpdate={isUpdate}
                onClose={handleClose}
              />
            )}
          </Box>
        </Modal>
        {/* <CustomModal
          open={open}
          onClose={handleClose}
          formType="product" // CustomModal can handle product-related forms
          productData={isUpdate ? addProductData : updateProductData}
          isUpdate={isUpdate}
        /> */}


      </Paper>
    </>
  );
}

export default AdminOperations;
