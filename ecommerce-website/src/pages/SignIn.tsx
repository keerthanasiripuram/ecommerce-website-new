import React, { useCallback, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Avatar,
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Button,
  Link,
  Snackbar,
  Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useModal } from "../store/UseModalType";
import CustomTextField from "../customFields/CustomTextField";
import axiosInstance from "../interceptors/interceptor";

type loginState = {
  email: string;
  password: string;
};

type signInProps = {
  onClose: () => void;
};

const SignIn = (props: signInProps) => {
  //login data
  const [loginFormData, setLoginFormData] = useState<loginState>({
    email: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
  };

  //modalType
  const setModalType = useModal((state) => state.setType);

  const handleModalType = () => {
    setModalType("register");
  };

  //snackbar hndlrs
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

  //validating login form data
  const validateForm = (): boolean => {
    if (!loginFormData.email.trim()) {
      showError("Email is required");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(loginFormData.email)) {
      showError("Email is invalid");
      return false;
    }
    if (!loginFormData.password.trim()) {
      showError("Password is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        console.log(loginFormData);
        const response = await axiosInstance.post("user/login", loginFormData);
        localStorage.setItem("token", response.data.data);
        showSuccess(response.data.message);
        props.onClose();
      } catch (err: any) {
        showError(err.response.data.message);
      }
      // finally {
      //   props.onClose();
      // }
    } else {
      console.log("Failed validations");
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
          Sign In
        </Typography>

        <Box component="form" sx={{ mt: 2 }} onSubmit={handleSubmit}>
          <CustomTextField
            value={loginFormData.email}
            label={"Email"}
            name={"email"}
            changeHandler={handleChange}
            type={"email"}
          />
          <CustomTextField
            value={loginFormData.password}
            label={"Password"}
            name={"password"}
            changeHandler={handleChange}
            type={"password"}
          />
          <Button
            type="submit"
            fullWidth
            color="primary"
            variant="contained"
            sx={{ mt: 2, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link component={RouterLink} to="/forgot" variant="body2">
                Forgot Password?
              </Link>
            </Grid>
            <Grid item xs>
              <div
                onClick={handleModalType}
                style={{
                  color: "rgb(37, 92, 116)",
                  textDecoration: "underline",
                }}
              >
                Register
              </div>
            </Grid>
          </Grid>
        </Box>
        {/* snackbar implementation */}
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

export default SignIn;
