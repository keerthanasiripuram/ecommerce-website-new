import React, { useState } from "react";
import { Alert, Button, Snackbar } from "@mui/material";
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
interface DisplayProductsProps {
    productsData: ProductState[];
    handleUpdateProduct: (product: ProductState) => void;
    handleDelete:(id: number) => void;
}

const DisplayProducts: React.FC<DisplayProductsProps> = ({
productsData,
handleUpdateProduct,
handleDelete,
}) => {
  return (
    <>
            {/* disly products*/}
            {productsData && (
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
        )}
    </>
  );
};

export default DisplayProducts;
