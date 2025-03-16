import React, { useCallback, useEffect, useState } from "react";
import Header from "../components/Header";
import axiosInstance from "../interceptors/interceptor";
import CustomModal from "../customFields/CustomModal";
import ProfileHelper from "../components/ProfileHelper";


const ProfileLayout = () => {


  const [userName, setUserName] = useState("");

  //modal data and handlers
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = useCallback(() => setOpen(false),[]);

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



  return (
    <>
      <Header enable={false} />

      {/* display categories */}

      <ProfileHelper  handleOpen={handleOpen} userName={userName}/>
            <CustomModal
        open={open}
        onClose={handleClose}
        formType="register"  // You can change this to 'login' if needed
      />

    </>
  );
};

export default ProfileLayout;
