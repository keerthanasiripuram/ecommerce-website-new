import { Box, Button, Grid, Link } from "@mui/material";
import CustomTextField from "../customFields/CustomTextField";
import { Link as RouterLink } from "react-router-dom";
import { useModal } from "../store/UseModalType";
import axiosInstance from "../interceptors/interceptor";
import { useCallback, useState } from "react";
type SignInFormProps = {
    loginFormData: { email: string; password: string };
    setLoginFormData: React.Dispatch<React.SetStateAction<{ email: string; password: string }>>;
    onClose: () => void;
    showError:(msg:string)=>void;
    showSuccess:(msg:string)=>void;
  };
  
const SignInForm=({ loginFormData, setLoginFormData, onClose,showError,showSuccess }: SignInFormProps)=>{

  //modalType
  const setModalType = useModal((state) => state.setType);

  const handleModalType = () => {
    setModalType("register");
  };

//   const [snackbarMessage, setSnackbarMessage] = useState<string>("");
//   const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
//   const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("error");


  
//   const showError = useCallback((msg: string) => {
//     setSnackbarMessage(msg);
//     setSnackbarOpen(true);
//     setSnackbarSeverity("error");
//   }, []);

//   const showSuccess = useCallback((msg: string) => {
//     setSnackbarMessage(msg);
//     setSnackbarOpen(true);
//     setSnackbarSeverity("success");
//   }, []);
  
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
            const response = await axiosInstance.post("auth/login", loginFormData);
            localStorage.setItem("token", response.data.data);
            showSuccess(response.data.message);
            onClose();
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
      
      const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      ) => {
        setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
      };
    
    return(
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
    )
}
export default SignInForm;



