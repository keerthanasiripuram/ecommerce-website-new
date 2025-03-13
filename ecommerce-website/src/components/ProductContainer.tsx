import React, { useMemo } from "react";
import { Grid, Typography, CardContent, Pagination } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useProduct } from "../store/UseProductStore";
import { StyledCard, StyledLink } from "../styledComponents/StyledComponent";

type productContainerState = {
  path: string;
  searchQuery: string;
  priceRange: number[];
  rating: number | null;
  currentPage: number;
  handlePageChange: (e: React.ChangeEvent<unknown>, page: number) => void;
};

const ProductContainer = ({
  path,
  searchQuery,
  priceRange,
  rating,
  currentPage,
  handlePageChange,
}: productContainerState) => {
  const productData = useProduct((state) => state.productData);
  const pageSize = 5;

  //fetch product based on path prdcts
  const pathProducts = useMemo(() => {
    return productData.filter((product) => {
      return product.category === path;
    });
  }, [path]);

  //fetch filtered prdcts bsd on filters
  const filteredProducts = useMemo(() => {
    return pathProducts.filter((product) => {
      const matchesSearchQuery =
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());

      const withinPriceRange =
        product.price >= priceRange[0] && product.price <= priceRange[1];

      const matchesRating = Math.ceil(product.rating) <= Number(rating);
      console.log(matchesRating, Math.ceil(product.rating), rating);
      return matchesSearchQuery && withinPriceRange && rating && matchesRating;
    });
  }, [searchQuery, priceRange, rating]);

  const paginatedData = useMemo(() => {
    return filteredProducts.length > pageSize
      ? filteredProducts.slice(
          (currentPage - 1) * pageSize,
          currentPage * pageSize,
        )
      : filteredProducts;
  }, [filteredProducts, currentPage]);

  return (
    <>
      {paginatedData.length > 0 ? (
        <>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {paginatedData.map((product) => (
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
                            ? `${product.images}`
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
            count={Math.ceil(filteredProducts.length / pageSize)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "20px",
            }}
          />
        </>
      ) : (
        <p style={{ textAlign: "center" }}>No Products found</p>
      )}
    </>
  );
};

export default React.memo(ProductContainer);
