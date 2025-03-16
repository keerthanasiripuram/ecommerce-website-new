import React from "react";
import { Modal, Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Login from '../pages/SignIn'; // Assuming Login component exists
import Registration from "../pages/Registration"; // Assuming Registration component exists
import AddProduct from "../components/AddProduct";
import AddReview from "../components/AddReview";
import ViewReviews from "../components/ViewReviews";
import { ProductState } from "../pages/AdminOperations";


interface CustomModalProps {
  open: boolean;
  data?:ProductState;
  isUpdate?:boolean;
  onClose: () => void;
  formType?: "login" | "register"|"add-review"| "view-review" |"add-product"|"update-product"; // To choose which form to display
}
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 1,
  maxHeight: "80vh",
  overflowY: "auto",
};

const CustomModal: React.FC<CustomModalProps> = ({
  open,
  data,
  isUpdate=false,
  onClose,
  formType = "login",
}) => {
  console.log(formType)
  return (
    // <Modal open={open} onClose={onClose}>
    //   <Box sx={style}>
    //       <IconButton
    //         onClick={onClose}
    //         style={{
    //           position: "absolute",
    //           top: 8,
    //           right: 8,
    //         }}
    //       >
    //         <CloseIcon />
    //       </IconButton>
    //       <Box>
    //                 {formType === "product" && (
    //       <AddProduct
    //         data={productData}
    //         isUpdate={isUpdate}
    //         onClose={onClose}
    //       />
    //     )}
    //         {formType === "login" ? (
    //           <Login onClose={onClose} />
    //         ) : (
    //           <Registration onClose={onClose} />
    //         )}
    //       </Box>
        
    //     </Box>
    // </Modal>
    <Modal open={open} onClose={onClose}>
    <Box
      sx={style}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
        }}
      >
        <CloseIcon />
      </IconButton>

        <Box>
          {/* {formType === "login" ? (
            <Login onClose={onClose} />
          ) : (
            <Registration onClose={onClose} />
          )} */}
          {formType === "login" && <Login onClose={onClose}/>}
          {formType === "register" && <Registration onClose={onClose}/>}
          {/* {formType === "add-review"&&<AddReview handleClose={onClose}/>} */}
         {formType==="view-review"&&<ViewReviews/>}
         {/* {formType === "add-product"&& <AddProduct data={data}
                isUpdate={isUpdate}
                onClose={onClose}/>} */}
        </Box>
    </Box>
  </Modal>

  );
};

export default React.memo(CustomModal);

// interface CustomModalProps {
//   open: boolean;
//   onClose: () => void;
//   formType: string; // e.g., 'product', 'register', etc.
//   productData?: ProductState; // Only needed for update
//   isUpdate: boolean;
// }

// const CustomModal: React.FC<CustomModalProps> = ({
//   open,
//   onClose,
//   formType,
//   productData,
//   isUpdate,
// }) => {
//   // Your logic for rendering different forms based on formType
//   // For 'product', render the AddProduct or EditProduct form

//   return (
//     <Modal open={open} onClose={onClose}>
//       <Box sx={style}>
//         {/* Your form content */}
//         {formType === "product" && (
//           <AddProduct
//             data={productData}
//             isUpdate={isUpdate}
//             onClose={onClose}
//           />
//         )}
//         {/* Other form types (e.g., 'register') can be handled here */}
//       </Box>
//     </Modal>
//   );
// };

