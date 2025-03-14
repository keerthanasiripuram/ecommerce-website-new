import axiosInstance from "../interceptors/interceptor";
type ReviewState = {
    reviewerName: string;
    reviewerEmail: string;
    rating: string;
    comment: string;
  };
  type ReadReviewState = {
    reviewerName: string;
    reviewerEmail: string;
    rating: number;
    comment: string;
    productId: number;
    date: string;
  };
export const addProductReview=async(readViewData:ReviewState,id:string)=>{
    console.log(readViewData,id)
    try {
        await axiosInstance.post("product/post-review",{...readViewData,id});
      }
      catch(err)
      {
        throw err;
      }
}
export const getReviewData=async(id:string):Promise<ReadReviewState[]> =>{
  try {
    const response = await axiosInstance.get(`/product/get-reviews/${id}`);
    return response.data.data;
  } catch (err) {
    console.log(err)
    // return []
    throw err;
  }
}

