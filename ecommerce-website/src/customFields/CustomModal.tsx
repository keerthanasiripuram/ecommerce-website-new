import React from "react";
import { Modal, Box, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Login from '../pages/SignIn'; // Assuming Login component exists
import Registration from "../pages/Registration"; // Assuming Registration component exists
import AddProduct from "../components/AddProduct";
import { ProductState } from "../components/ProductContainer1";

interface CustomModalProps {
  open: boolean;
  onClose: () => void;
  formType?: "login" | "register"; // To choose which form to display
  message?: string; // Message to show if not displaying a form
  severity?: "success" | "error"; // Severity to style the message (if any)
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
  onClose,
  formType = "login", // Default to 'login' if not provided
  message,
  severity = "success", // Default severity is success

}) => {
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

      {/* If there's a message, show it; otherwise, show the appropriate form */}
      {message ? (
        <Box>
          <Typography variant="h6" color={severity === "error" ? "red" : "green"}>
            {message}
          </Typography>
        </Box>
      ) : (
        <Box>
          {formType === "login" ? (
            <Login onClose={onClose} />
          ) : (
            <Registration onClose={onClose} />
          )}
        </Box>
      )}
    </Box>
  </Modal>

  );
};

export default CustomModal;

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

