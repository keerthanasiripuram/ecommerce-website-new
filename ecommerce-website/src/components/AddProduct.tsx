import {
  Container,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import AddProductForm from "./AddProductForm";


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
type AddProductProps = {
  data: ProductState;
  isUpdate: boolean;
  onClose: () => void;
};

const AddProduct = ({ data, isUpdate, onClose }: AddProductProps) => {
  console.log(data);
  return (
    <>
      <Container maxWidth="xs">
        <Paper
          elevation={3}
          sx={{
            mt: 8,
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            {isUpdate ? "Update Product" : "Add Product"}
          </Typography>
          <AddProductForm data={data} isUpdate={isUpdate} onClose={onClose}/>
        </Paper>
      </Container>
    </>
  );
};

export default React.memo(AddProduct);
