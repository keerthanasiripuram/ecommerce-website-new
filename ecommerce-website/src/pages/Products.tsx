import React, { useState, useEffect, Suspense, lazy, useCallback } from "react";
import { useSearchParams, useLocation } from "react-router";
import { Box } from "@mui/material";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import ProductContainer1 from "../components/ProductContainer1";
const PageLayout = lazy(() => import("../components/PageLayout"));

const loadingStyle = {
  borderRadius: "50%",
  height: "25px",
  width: "25px",
  margin: "auto",
  marginTop: "15px",
  border: "2px solid blue",
  borderTopColor: "transparent",
  animation: "spin 1s linear infinite",
  "@keyframes spin": {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
  },
};

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const path = useLocation().pathname.slice(1);

  //handle filters
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || "",
  );

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const [priceRange, setPriceRange] = useState<number[]>(
    searchParams.get("price")
      ? searchParams.get("price")!.split("-").map(Number)
      : [0, 1000],
  );

  const handlePriceChange = useCallback(
    (e: Event, newValue: number | number[]) => {
      setPriceRange(newValue as number[]);
    },
    [],
  );

  const [rating, setRating] = useState<number | null>(
    searchParams.get("rating") ? Number(searchParams.get("rating")) : 5,
  );

  const handleRatingChange = useCallback(
    (e: React.SyntheticEvent<Element, Event>, newValue: number | null) => {
      setRating(newValue);
    },
    [],
  );

  const [currentPage, setCurrentPage] = useState<number>(
    searchParams.get("page") ? Number(searchParams.get("page")) : 1,
  );

  const handlePageChange = useCallback(
    (e: React.ChangeEvent<unknown>, page: number) => {
      setCurrentPage(page);
    },
    [],
  );

  useEffect(() => {
    const params: any = {
      search: searchQuery,
      price: priceRange.join("-"),
      rating: rating?.toString() || 5,
      page: currentPage.toString(),
    };
    setSearchParams(params);
  }, [searchQuery, priceRange, rating, currentPage, setSearchParams]);

  return (
    <>
      <Box>
        <Header searchQuery={searchQuery} changeHandler={handleChange} />
      </Box>

      <Suspense fallback={<Box sx={loadingStyle}></Box>}>
        <PageLayout>
          <SideBar
            priceRange={priceRange}
            rating={rating}
            handlePriceChange={handlePriceChange}
            handleRatingChange={handleRatingChange}
          ></SideBar>
          <ProductContainer1
            path={path}
            searchQuery={searchQuery}
            priceRange={priceRange}
            rating={rating}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          />
        </PageLayout>
      </Suspense>
    </>
  );
};

export default Products;
