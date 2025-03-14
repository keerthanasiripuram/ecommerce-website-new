import { Box, Button, Container, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router";
import CustomTextField from "../customFields/CustomTextField";
import { addProductReview } from "../controllers/ProductController";

type ReviewState = {
  reviewerName: string;
  reviewerEmail: string;
  rating: string;
  comment: string;
};

type AddReviewProps = {
  handleClose: () => void;
};

const AddReview = (props: AddReviewProps) => {
  const { id } = useParams();

  //handle review data
  const [review, setReview] = useState<ReviewState>({
    reviewerEmail: "",
    reviewerName: "",
    rating: "",
    comment: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setReview({ ...review, [name]: value });
  };

  const handleSubmit = async () => Promise<void>
  {
    try{
      if(id)
      {
      addProductReview(review,id);
      props.handleClose();
      }
    }
    catch(err)
    {
      console.log(err)
    }
  }
  return (
    
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
            Add Review
          </Typography>

          {/*form component*/}
          <Box component="div" sx={{ mt: 2 }}>
            <CustomTextField
              value={review.reviewerName}
              label={"Name"}
              name={"reviewerName"}
              changeHandler={handleChange}
            />
            <CustomTextField
              value={review.reviewerEmail}
              label={"Email"}
              name={"reviewerEmail"}
              type={"email"}
              changeHandler={handleChange}
            />
            <CustomTextField
              value={review.rating}
              label={"Rating"}
              name={"rating"}
              type={"number"}
              changeHandler={handleChange}
            />
            <CustomTextField
              value={review.comment}
              label={"Comment"}
              name={"comment"}
              changeHandler={handleChange}
            />
            <Button
              fullWidth
              color="primary"
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Box>
        </Paper>
      </Container>
  );
};

export default React.memo(AddReview);


