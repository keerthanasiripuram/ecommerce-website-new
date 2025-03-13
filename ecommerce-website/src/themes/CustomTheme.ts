import { createTheme } from "@mui/material";

const CustomTheme = createTheme({
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      fontSize: "2rem",
      fontWeight: 500,
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: 500,
    },
  },
});
export default CustomTheme;
