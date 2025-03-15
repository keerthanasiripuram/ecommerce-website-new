import React, { useCallback, useEffect, useState } from "react";
import { Card, Button, Modal, Box, IconButton, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import Registration from "./Registration";
import Header from "../components/Header";
import axiosInstance from "../interceptors/interceptor";
import ViewOrders1 from "./ViewOrders1";
import CustomModal from "../customFields/CustomModal";

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

const Profile = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");

  //modal data and handlers
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  //fetch user details
  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    try {
      const response = await axiosInstance.get("user/get-user");
      setUserName(response.data.data.name);
      console.log(response.data.message);
    } catch (err: any) {
      console.log(err);
    }
  };

  //handle logout
  const handleLogOut = useCallback(() => {
    localStorage.removeItem("token");
    navigate("/");
  }, []);

  return (
    <>
      <Header enable={false} />

      {/* display categories */}
      <Card sx={{ display: "flex", m: 3, p: 1 }}>
        <Container sx={{ width: "30%", marginLeft: 0 }}>
          <Box
            style={{
              height: "30px",
              borderBottom: "1px solid black",
              padding: "10px",
            }}
          >
            {userName}
          </Box>
          <Box
            style={{
              height: "60px",
              borderBottom: "1px solid black",
              display: "flex",
            }}
          >
            <Button
              variant="contained"
              color="success"
              style={{ flex: 1, height: "30px", marginTop: "30px" }}
            >
              Orders
            </Button>
          </Box>
          <Box
            sx={{
              height: "60px",
              borderBottom: "1px solid black",
              display: "flex",
            }}
          >
            <Button
              variant="contained"
              onClick={handleOpen}
              style={{ flex: 1, height: "30px", marginTop: "30px" }}
            >
              Manage Profile
            </Button>
          </Box>
          <Box
            style={{
              height: "60px",
              borderBottom: "1px solid black",
              display: "flex",
            }}
          >
            <Button
              variant="contained"
              color="error"
              onClick={handleLogOut}
              style={{ flex: 1, height: "30px", marginTop: "30px" }}
            >
              Log Out
            </Button>
          </Box>
        </Container>
        <Container
          style={{ width: "70%", backgroundColor: "grey", padding: "10px" }}
        >
          <ViewOrders1 />
        </Container>
      </Card>

      {/* modal to open registration form */}
      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
          <Registration onClose={handleClose} />
        </Box>
      </Modal> */}
            <CustomModal
        open={open}
        onClose={handleClose}
        formType="register"  // You can change this to 'login' if needed
      />

    </>
  );
};

export default Profile;
