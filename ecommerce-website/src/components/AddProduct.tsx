import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import CustomTextField from "../customFields/CustomTextField";
import axiosInstance from "../interceptors/interceptor";

type ProductState = {
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
  console.log(data)
  //handle img
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setImage(file);
  };

  //handle modal data
  const [modalData, setModalData] = useState<ProductState>(data);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setModalData({ ...modalData, [name]: value });
    console.log(modalData)
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //create form-data
    const formData = new FormData();
    console.log(formData)
    console.log(modalData.title)
    formData.append('title',modalData.title);
    console.log(formData)
    formData.append("description", modalData.description);
    formData.append("category", modalData.category);
    formData.append("price", modalData.price.toString());
    formData.append("rating", modalData.rating.toString());
    formData.append("stock", modalData.stock.toString());

    // Append the image file if it exists
    if (image) {
      formData.append("image", image);
    }

    try {
      if (!isUpdate) {
        console.log(formData);
        const response = await axiosInstance.post(
          "admin/post-product",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } },
        );
        console.log(response.data.message);
        onClose();
      } else {
        const product_id = modalData.id;
        const response = await axiosInstance.put(
          `admin/update-product/${product_id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } },
        );
        console.log(response.data.message);
        onClose();
      }
    } catch (err: any) {
      console.log(err);
    }
  };
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
          <Box component="form" sx={{ mt: 2 }} onSubmit={handleSubmit}>
            <CustomTextField
              value={modalData.title}
              label={"Title"}
              name={"title"}
              changeHandler={handleChange}
            />
            <CustomTextField
              value={modalData.category}
              label={"Category"}
              name={"category"}
              changeHandler={handleChange}
            />
            <TextField
              value={modalData.rating}
              label={"rating"}
              name={"rating"}
              type={"number"}
              onChange={handleChange}
              inputProps={{ min: 1, max: 5 }}
              sx={{ width: "100%" }}
            />
            <CustomTextField
              value={modalData.stock}
              label={"stock"}
              name={"stock"}
              type={"number"}
              changeHandler={handleChange}
            />
            <CustomTextField
              value={modalData.price}
              label={"price"}
              name={"price"}
              type={"number"}
              changeHandler={handleChange}
            />
            <CustomTextField
              value={modalData.description}
              label={"Description"}
              name={"description"}
              changeHandler={handleChange}
            />
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              accept="image/*"
              style={{ marginTop: "10px" }}
            />
            {isUpdate ? (
              <Button
                type="submit"
                fullWidth
                color="primary"
                variant="contained"
                sx={{ mt: 2, mb: 2 }}
              >
                Update
              </Button>
            ) : (
              <Button
                type="submit"
                fullWidth
                color="primary"
                variant="contained"
                sx={{ mt: 2, mb: 2 }}
              >
                Submit
              </Button>
            )}
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default React.memo(AddProduct);
