import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Typography, useTheme } from "@mui/material";
import ecommerceImg from "../assets/ecommerce.png";
import {
  StyledBox,
  StyledCard,
  StyledContainer,
  StyledLink,
} from "../styledComponents/StyledComponent";
import Header from "../components/Header";
import { useProduct } from "../store/UseProductStore";
import axiosInstance from "../interceptors/interceptor";


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
};

const HomePage1 = () => {
  const [loading, setLoading] = useState(true);

  //get and set productData
  const productData = useProduct((state) => state.productData);

  const setProductData = useProduct((state) => state.setProductData);

  const getProducts = async () => {
    try {
      const response = await axiosInstance.get("user/get-products");
      setProductData(response.data.data);
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  //filter categories
  const [categories, setCategories] = useState<String[]>([]);

  productData.forEach((product) => {
    if (!categories.includes(product.category)) {
      setCategories([...categories, product.category]);
    }
  });

  return (
    <>
      <Header enable={false} />
      <img src={ecommerceImg} style={{ height: "300px", width: "100%" }} />
      <Typography
        variant="h4"
        sx={{ textAlign: "center", color: "theme.palette.primary.main" }}
      >
        Categories:
      </Typography>
      <StyledBox>
        {loading ? (
          <p>Loading..</p>
        ) : (
          categories.map((category, index) => (
            <StyledContainer key={index}>
              <StyledLink component={RouterLink} to={`/${category}`}>
                <StyledCard>
                  <Typography variant="h5">{category}</Typography>
                </StyledCard>
              </StyledLink>
            </StyledContainer>
          ))
        )}
      </StyledBox>
    </>
  );
};

export default HomePage1;
