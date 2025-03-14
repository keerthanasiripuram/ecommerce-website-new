import React, { useEffect, useMemo, useState } from "react";
import { Grid, Typography, CardContent, Pagination } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { StyledCard, StyledLink } from "../styledComponents/StyledComponent";
import axiosInstance from "../interceptors/interceptor";

type ProductContainerProps = {
  path: string;
  searchQuery: string;
  priceRange: number[];
  rating: number | null;
  currentPage: number;
  handlePageChange: (e: React.ChangeEvent<unknown>, page: number) => void;
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
  images: string;
  quantity: number;
  reviews: Array<ReviewState>;
  tot_len?: number;
};

const ProductContainer1 = ({
  path,
  searchQuery,
  priceRange,
  rating,
  currentPage,
  handlePageChange,
}: ProductContainerProps) => {
  const [loading, setLoading] = useState(true);

  const [totLen, setTotLen] = useState(0);

  //set and get the prdctData
  const [productData, setProductData] = useState<ProductState[]>([]);

  const getFilteredProducts = async () => {
    try {
      const priceRangeParam = priceRange ? priceRange.join(",") : "";
      const response = await axiosInstance.get(
        `user/get-filtered-products?category=${path}&searchquery=${searchQuery}&rating=${rating}&pricerange=${priceRangeParam}&page=${currentPage}`,
      );
      setProductData(response.data.data.rows);
      setTotLen(response.data.data.tot_len);
      setLoading(false);
    } catch (err) {
      setProductData([]);
      setLoading(false);
      console.log("Error fetching products:", err);
    }
  };

  useEffect(() => {
    getFilteredProducts();
  }, [path, searchQuery, priceRange, rating, currentPage]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "25px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {loading ? (
          <p>Loading...</p>
        ) : productData && productData.length > 0 ? (
          <>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {productData.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <StyledLink
                    component={RouterLink}
                    to={`/product-detail-page/${product.id}`}
                  >
                    <StyledCard>
                      <CardContent>
                        <img
                          src={
                            typeof product.images === "string"
                              ? `http://localhost:3001/${product.images}`
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
                        <Typography variant="h5">{product.title}</Typography>
                        <Typography variant="h6">{product.category}</Typography>
                        <Typography variant="h6">${product.price}</Typography>
                        <Typography variant="h6">
                          Rating:{product.rating}
                        </Typography>
                      </CardContent>
                    </StyledCard>
                  </StyledLink>
                </Grid>
              ))}
            </Grid>
            <Pagination
              count={totLen / 2}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </>
        ) : (
          <p>No prdcts found</p>
        )}
      </div>
    </>
  );
};

export default React.memo(ProductContainer1);
