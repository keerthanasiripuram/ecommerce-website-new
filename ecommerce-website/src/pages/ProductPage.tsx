import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useProduct } from "../store/UseProductStore";
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

const ProductPage = () => {
  const ProductData = useProduct((state) => state.productData);
  const setCartData = useCart((state) => state.setCartData);
  const { id } = useParams();

  //modal dta & handlers
  const [open, setOpen] = React.useState(false);
  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);
  const handleClose = useCallback(() => setOpen(false), []);

  //open/clse review modal
  const [reviewOpen, setReviewOpen] = useState(false);
  const handleOpenReview = useCallback(() => {
    setReviewOpen(true);
  }, []);
  const handleCloseReview = useCallback(() => setReviewOpen(false), []);

  const filteredProduct = useMemo(() => {
    return ProductData.find((product) => product.id == Number(id));
  }, [id]);

  // const handleAddToCart = useCallback((id: number) => {
  //   if (!filteredProduct) return alert("product not found");
  //   setCartData({ ...filteredProduct, quantity: 1 });
  // }, []);

  //enable/disable addtocart btn bsd on stck data
  const [disable, setDisable] = useState(false);
  const stock = filteredProduct ? filteredProduct.stock : 0;

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

      <div>
        {!filteredProduct ? (
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
                  typeof filteredProduct.images === "string"
                    ? `${filteredProduct.images}`
                    : ""
                }
                alt={filteredProduct.title}
                style={{
                  maxWidth: "100%",
                  maxHeight: "200px",
                  objectFit: "contain",
                  borderRadius: "8px",
                  marginBottom: "16px",
                }}
              />
              <CardContent>
                <Typography variant="h5">{filteredProduct.title}</Typography>
                <Typography variant="h6">${filteredProduct.price}</Typography>
                <Typography variant="body2">
                  {filteredProduct.description}
                </Typography>
                <br></br>
                <Box sx={{ display: "flex", gap: 5 }}>
                  {/* <Button
                    variant="contained"
                    disabled={disable}
                    onClick={() => {
                      handleAddToCart(filteredProduct.id);
                    }}
                  >
                    Add To Cart
                  </Button> */}
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
            <AddReview handleClose={handleClose} />
          </Box>
        </Modal>

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
      </div>
    </>
  );
};

export default ProductPage;
