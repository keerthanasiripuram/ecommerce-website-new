import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Avatar,
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Grid,
  Button,
  Snackbar,
  Alert,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../interceptors/interceptor";
import CustomTextField from "../customFields/CustomTextField";
import { useUserProfile } from "../store/UserProfileStore";
import { useModal } from "../store/UseModalType";

export type registerState = {
  name: string;
  email: string;
  mobilenumber: string;
  password: string;
  confirmPassword: string;
  role: string;
  address: string;
};

type registerProps = {
  onClose: () => void;
};

const Registration = (props: registerProps) => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const path = useLocation().pathname.slice(1);

  const decodedToken = token
    ? jwtDecode<{ id: string; role: string }>(token)
    : { id: null, role: null };

  //display modal based on form type
  const setModalType = useModal((state) => state.setType);

  const handleModalType = () => {
    setModalType("sign-in");
  };

  const setData = useUserProfile((state) => state.setData);

  const [registerFormData, setRegisterFormData] = useState<registerState>({
    name: "",
    email: "",
    mobilenumber: "",
    password: "",
    confirmPassword: "",
    role: "",
    address: "",
  });

  //form chnage handlers
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setRegisterFormData({ ...registerFormData, [name]: value });
    setData(name as keyof typeof registerFormData, value);
  };

  const handleRadio = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string,
  ) => {
    setRegisterFormData({ ...registerFormData, role: value });
    const { name } = event.target;
    setData(name as keyof typeof registerFormData, value);
  };

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode<{ id: string }>(token);
      fetchUserDetails(decodedToken.id);
    }
  }, []);

  const fetchUserDetails = async (id: string) => {
    try {
      const response = await axiosInstance.get("user/fetch-user");
      setRegisterFormData({
        ...(response.data.data || {}),
        password: "",
        confirmPassword: "",
      });
    } catch (err: any) {
      console.log(err.response.data.message);
    }
  };

  //snackbar data
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);

  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "error",
  );

  const showError = useCallback((msg: string) => {
    setSnackbarMessage(msg);
    setSnackbarOpen(true);
    setSnackbarSeverity("error");
  }, []);

  const showSuccess = useCallback((msg: string) => {
    setSnackbarMessage(msg);
    setSnackbarOpen(true);
    setSnackbarSeverity("success");
  }, []);

  const handleCloseSnackbar = useCallback(
    (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === "clickaway") return;
      setSnackbarOpen(false);
    },
    [],
  );

  //form validations
  const validateForm = (): boolean => {
    console.log(registerFormData);
    if (!registerFormData.name.trim()) {
      showError("Name is required");
      return false;
    }
    if (!registerFormData.email.trim()) {
      showError("Email is required");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(registerFormData.email)) {
      showError("Email is invalid");
      return false;
    }
    if (!registerFormData.mobilenumber.trim()) {
      showError("Phone number is required");
      return false;
    } else if (!/^\+[1-9]\d{1,14}$/.test(registerFormData.mobilenumber)) {
      showError("Phone number is invalid");
      return false;
    }
    if (!token) {
      if (!registerFormData.password.trim()) {
        showError("Password is required");
        return false;
      }
      if (!registerFormData.confirmPassword.trim()) {
        showError("Confirm password is required");
        return false;
      } else if (
        registerFormData.confirmPassword !== registerFormData.password
      ) {
        showError("Passwords do not match");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token) {
      if (validateForm()) {
        try {
          const response = await axiosInstance.post("user/register", {
            name: registerFormData.name,
            email: registerFormData.email,
            mobile_number: registerFormData.mobilenumber,
            password: registerFormData.password,
            confirm_password: registerFormData.confirmPassword,
            role: registerFormData.role,
            address: registerFormData.address,
          });
          navigate("/");
        } catch (err: any) {
          showError(err.response.data.message);
        } finally {
          props.onClose();
        }
      } else {
        console.log("Failed validations");
      }
    } else {
      if (validateForm()) {
        try {
          const response = await axiosInstance.put("user/update-profile", {
            name: registerFormData.name,
            email: registerFormData.email,
            mobile_number: registerFormData.mobilenumber,
            role: registerFormData.role,
            address: registerFormData.address,
          });
          showSuccess(response.data.message);
        } catch (err: any) {
          showError(err.response.data.message);
        } finally {
          props.onClose();
        }
      } else {
        console.log("Failed validations");
      }
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
        <Avatar sx={{ bgcolor: "primary.main", mb: 2 }}>
          <LockOutlinedIcon></LockOutlinedIcon>
        </Avatar>

        <Typography component="h1" variant="h5">
          {token ? (
            path === "checkout" ? (
              <p>Address</p>
            ) : (
              <p>Edit Profile</p>
            )
          ) : (
            <p>Register Form</p>
          )}
        </Typography>

        {/* form */}
        <Box component="form" sx={{ mt: 2 }} onSubmit={handleSubmit}>
          {path !== "checkout" && (
            <CustomTextField
              value={registerFormData.name}
              label={"Name"}
              name={"name"}
              changeHandler={handleChange}
            />
          )}
          {path !== "checkout" && (
            <CustomTextField
              value={registerFormData.email}
              label={"Email"}
              name={"email"}
              type={"email"}
              changeHandler={handleChange}
            />
          )}
          {path !== "checkout" && (
            <CustomTextField
              value={registerFormData.mobilenumber}
              label={"Mobile Number"}
              name={"mobilenumber"}
              changeHandler={handleChange}
              type={"phone"}
            />
          )}
          {!token && path !== "checkout" && (
            <CustomTextField
              value={registerFormData.password}
              label={"Password"}
              name={"password"}
              changeHandler={handleChange}
              type={"password"}
            />
          )}
          {!token && path !== "checkout" && (
            <CustomTextField
              value={registerFormData.confirmPassword}
              label={"Confirm Password"}
              name={"confirmPassword"}
              changeHandler={handleChange}
              type={"password"}
            />
          )}
          <TextField
            label="Enter addresss"
            value={registerFormData.address}
            name="address"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            onChange={handleChange}
          />
          {path !== "checkout" && (
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="role"
              onChange={handleRadio}
              value={registerFormData.role}
            >
              <FormControlLabel
                value="admin"
                control={<Radio />}
                label="Admin"
              />
              <FormControlLabel
                value="customer"
                control={<Radio />}
                label="Customer"
              />
            </RadioGroup>
          )}
          <Button
            type="submit"
            fullWidth
            color="primary"
            variant="contained"
            sx={{ mt: 2, mb: 2 }}
          >
            {token ? (
              path === "checkout" ? (
                <p>Add Address</p>
              ) : (
                <p>Update</p>
              )
            ) : (
              <p>Submit</p>
            )}
          </Button>
          <Grid container>
            <Grid item xs>
              {!token && (
                <div
                  onClick={handleModalType}
                  style={{
                    color: "rgb(37, 92, 116)",
                    textDecoration: "underline",
                  }}
                >
                  Already have an account?
                </div>
              )}
            </Grid>
          </Grid>
        </Box>

        {/* Snackbar for error messages */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
};

export default Registration;
