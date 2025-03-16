import { Box, Button, Container, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router";
import CustomTextField from "../customFields/CustomTextField";
import { addProductReview } from "../services/ProductServices";
import axiosInstance from "../interceptors/interceptor";

type ReviewState = {
  reviewerName: string;
  reviewerEmail: string;
  rating: string;
  comment: string;
};

type AddReviewProps = {
  handleClose: () => void;
};

const AddReview = (props:AddReviewProps) => {
  const { id } = useParams();

  console.log(id)
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

  //  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   console.log("fghjk")
  //   e.preventDefault();
  
  //   try{
  //     console.log(id)
  //     if(id)
  //     {
  //       console.log("sad")
  //    addProductReview(review,id);
  //     props.handleClose();
  //     }
  //   }
  //   catch(err)
  //   {
  //     console.log(err)
  //   }
  // }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("asd")
    e.preventDefault();
    try {
      const response = await axiosInstance.post("product/post-review", {
        ...review,
        id,
      });
      props.handleClose();
    } catch (err: any) {
      // alert("please login to proceed");
      console.log(err);
    }
  };
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
          <Box component="form" sx={{ mt: 2 }} onSubmit={handleSubmit}>
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
            >
              Submit
            </Button>
          </Box>
        </Paper>
      </Container>
  );
};

export default React.memo(AddReview);

// import { Box, Button, Container, Paper, Typography } from "@mui/material";
//  import React, { useState } from "react";
//  import { useParams } from "react-router";
//  import CustomTextField from "../customFields/CustomTextField";
//  import axiosInstance from "../interceptors/interceptor";
 
//  type ReviewState = {
//    reviewerName: string;
//    reviewerEmail: string;
//    rating: string;
//    comment: string;
//  };
 
//  type AddReviewProps = {
//    handleClose: () => void;
//  };
 
//  const AddReview = (props: AddReviewProps) => {
//   const { id } = useParams();

//   //handle review data
//   const [reviewData, setReviewData] = useState<ReviewState>({
//     reviewerEmail: "",
//     reviewerName: "",
//     rating: "",
//     comment: "",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setReviewData({ ...reviewData, [name]: value });
//   };
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       const response = await axiosInstance.post("product/post-review", {
//         ...reviewData,
//         id,
//       });
//       props.handleClose();
//     } catch (err: any) {
//       // alert("please login to proceed");
//       console.log(err);
//     }
//   };
//   return (
//     <>
//       <Container maxWidth="xs">
//         <Paper
//           elevation={3}
//           sx={{
//             mt: 8,
//             p: 4,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
//           <Typography component="h1" variant="h5">
//             Add Review
//           </Typography>
// {/*form component*/}
// <Box component="form" sx={{ mt: 2 }} onSubmit={handleSubmit}>
//              <CustomTextField
//                value={reviewData.reviewerName}
//                label={"Name"}
//                name={"reviewerName"}
//                changeHandler={handleChange}
//              />
//              <CustomTextField
//                value={reviewData.reviewerEmail}
//                label={"Email"}
//                name={"reviewerEmail"}
//                type={"email"}
//                changeHandler={handleChange}
//              />
//              <CustomTextField
//                value={reviewData.rating}
//                label={"Rating"}
//                name={"rating"}
//                type={"number"}
//                changeHandler={handleChange}
//              />
//              <CustomTextField
//                value={reviewData.comment}
//                label={"Comment"}
//                name={"comment"}
//                changeHandler={handleChange}
//              />
//              <Button
//                type="submit"
//                fullWidth
//                color="primary"
//                variant="contained"
//                sx={{ mt: 2, mb: 2 }}
//              >
//                Submit
//              </Button>
//            </Box>
//          </Paper>
//        </Container>
//      </>
//    );
//  };
//  export default React.memo(AddReview);