import React, { useCallback, useState } from "react";
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
import CustomSnackBar from "../customFields/CustomSnackBar";
import SignInForm from "../components/SignInForm";

type LoginState = {
  email: string;
  password: string;
};

type SignInProps = {
  onClose: () => void;
};

const SignIn = (props: SignInProps) => {
  //login data
  const [loginFormData, setLoginFormData] = useState<LoginState>({
    email: "",
    password: "",
  });

  

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
        <SignInForm 
          loginFormData={loginFormData} 
          setLoginFormData={setLoginFormData} 
          onClose={props.onClose} 
          showError={showError}
          showSuccess={showSuccess}
        />

        {/* <Box component="form" sx={{ mt: 2 }} onSubmit={handleSubmit}>
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
        </Box> */}
        {/* snackbar implementation */}
        {/* <Snackbar
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
        </Snackbar> */}
                <CustomSnackBar
        message={snackbarMessage}
        severity={snackbarSeverity}
        open={snackbarOpen}
        onClose={handleCloseSnackbar}
      />
      </Paper>
    </Container>
  );
};

export default SignIn;
