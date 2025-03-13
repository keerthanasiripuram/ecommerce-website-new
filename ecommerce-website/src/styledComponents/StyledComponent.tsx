import { alpha, Box, Card, Container, Link, styled } from "@mui/material";

export const StyledBox = styled(Box)({
  display: "flex",
});

export const StyledContainer = styled(Container)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "10px",
});

export const StyledLink = styled(Link)({
  textDecoration: "none",
}) as typeof Link;

export const StyledCard = styled(Card)({
  padding: "20px",
  textAlign: "center",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
  width: "100%",
  height: "100%",
  transition: "0.3s",
  "&:hover": {
    transform: "scale(1.05)",
  },
});

export const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

export const Loaderstyle = {
  borderRadius: "50%",
  height: "25px",
  width: "25px",
  margin: "auto",
  marginTop: "15px",
  border: "2px solid blue",
  borderTopColor: "transparent",
  animation: "spin 1s linear infinite",
  "@keyframes spin": {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
  },
};
