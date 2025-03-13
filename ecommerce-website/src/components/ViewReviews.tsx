import { Box, Container, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axiosInstance from "../interceptors/interceptor";

type readReviewState = {
  reviewer_name: string;
  reviewer_email: string;
  rating: number;
  comment: string;
  product_id: number;
  date: string;
};

const ViewReviews = () => {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);

  //view-reviews
  const [reviewData, setReviewData] = useState<readReviewState[]>([]);

  useEffect(() => {
    viewReviews();
  }, [id]);

  const viewReviews = async () => {
    try {
      const response = await axiosInstance.get(`product/view-reviews/${id}`);
      setReviewData(response.data.data);
      setIsLoading(false);
    } catch (err: any) {
      console.log(err);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Container maxWidth="xs">
        <Paper
          elevation={3}
          sx={{ mt: 8, p: 4, display: "flex", flexDirection: "column" }}
        >
          {isLoading ? (
            <p>Loading...</p>
          ) : reviewData.length > 0 ? (
            reviewData.map((review, index) => (
              <Box
                key={index}
                style={{ borderBottom: "2px solid black", margin: "5px" }}
              >
                <Typography variant="body2">Rating: {review.rating}</Typography>
                <Typography variant="body2">
                  Reviewer Name: {review.reviewer_name}
                </Typography>
                <Typography variant="body2">
                  Comment: {review.comment}
                </Typography>
              </Box>
            ))
          ) : (
            <p>No reviews found</p>
          )}
        </Paper>
      </Container>
    </>
  );
};

export default React.memo(ViewReviews);
