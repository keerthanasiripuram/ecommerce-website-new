import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Container,
  Modal,
  Box,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddReview from "../components/AddReview";
import ViewReviews from "../components/ViewReviews";
import { useCart } from "../store/UseCartStore";
import Header from "../components/Header";
import axiosInstance from "../interceptors/interceptor";
import { jwtDecode } from "jwt-decode";
import { loaderStyle } from "../styledComponents/StyledComponent";
import CustomModal from "../customFields/CustomModal";

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

export type ReviewState = {
  rating: number;
  comment: string;
  date: Date;
  reviewerName: string;
  reviewerEmail: string;
};

export type ProductState = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  image: string;
  quantity: number;
  reviews: Array<ReviewState>;
};

const ProductPage1 = () => {
  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem("token");

  const decodedToken = token
    ? jwtDecode<{ id: string; role: string }>(token)
    : { id: null, role: null };

  const { id } = useParams();

  //get and set prdctData
  const [productData, setProductData] = useState<ProductState>();

  useEffect(() => {
    getSingleProduct();
  }, []);

  const getSingleProduct = async () => {
    try {
      const response = await axiosInstance.get(`user/get-product/${id}`);
      setProductData(response.data.data);
      console.log(response.data.message);
      setIsLoading(false);
    } catch (err: any) {
      console.log(err.response.data.message);
      setIsLoading(false);
    }
  };

  //handle cart data
  const setCartData = useCart((state) => state.setCartData);

  const handleAddToCart = async (id: number) => {
    await getSingleProduct();
    if (!productData) return alert("product not found");
    setCartData({ ...productData, quantity: 1 });
  };

  //modal dta & handlers
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    console.log("helloaefgh")
    setOpen(true);
    
  }
  console.log(open)

  const handleClose = () => setOpen(false);

  //open/clse review modal
  const [reviewOpen, setReviewOpen] = useState(false);

  const handleOpenReview = () => {
    setReviewOpen(true);
  }

  const handleCloseReview = () => setReviewOpen(false);

  //enable/disable addtocart btn bsd on stck data
  const [disable, setDisable] = useState(false);

  const stock = productData ? productData.stock : 0;

  useEffect(() => {
    if (stock < 1) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [stock]);

  return (
    <>
      <Header enable={false} />
        {isLoading ? (
          <Box sx={loaderStyle}></Box>
        ) : !productData ? (
          <h2>No Product Found</h2>
        ) : (
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              p: 2,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card
              sx={{ display: "flex", flexDirection: "column", width: "500px" }}
            >
              <img
                src={
                  typeof productData.image === "string"
                    ? `http://localhost:3001/${productData.image}`
                    : ""
                }
                style={{
                  maxWidth: "100%",
                  maxHeight: "200px",
                  objectFit: "contain",
                  borderRadius: "8px",
                  marginBottom: "16px",
                }}
              />

              <CardContent>
                <Typography variant="h5">{productData.title}</Typography>
                <Typography variant="h6">${productData.price}</Typography>
                <Typography variant="body2">
                  {productData.description}
                </Typography>
                <br></br>
                <Box sx={{ display: "flex", gap: 5 }}>
                  {decodedToken.role !== "admin" && (
                    <Button
                      variant="contained"
                      disabled={disable}
                      onClick={() => {
                        handleAddToCart(productData.id);
                      }}
                    >
                      Add To Cart
                    </Button>
                  )}
                  <Button variant="contained" onClick={handleOpen}>
                    Add Review
                  </Button>
                  <Button variant="contained" onClick={handleOpenReview}>
                    View Reviews
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Container>
        )}

        {/* modals to add review/view review  */}
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
            <AddReview handleClose={handleClose}/>
          </Box>
        </Modal>
        {/* <CustomModal
        open={open}
        onClose={handleClose}
        formType={"add-review"}// Pass the appropriate form type based on modalType
      /> */}
        <Modal
          open={reviewOpen}
          onClose={handleCloseReview}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <IconButton
              onClick={handleCloseReview}
              style={{
                position: "absolute",
                top: 8,
                right: 8,
              }}
            >
              <CloseIcon />
            </IconButton>
            <ViewReviews />
          </Box>
        </Modal>
                {/* <CustomModal
        open={reviewOpen}
        onClose={handleCloseReview}
        formType={"view-review"}// Pass the appropriate form type based on modalType
      /> */}
    </>
  );
};

export default ProductPage1;
