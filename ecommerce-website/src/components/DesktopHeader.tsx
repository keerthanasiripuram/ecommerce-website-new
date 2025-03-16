import { Badge, Box, IconButton, Menu, MenuItem } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import React, { useCallback } from "react";
import { jwtDecode } from "jwt-decode";
interface CartData {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    image: String;
    quantity: number;
  }
interface DeskTopHeaderComponentProps {
    cartData:CartData[],
    handleCart:()=>void,
    handleLogOut:()=>void,
    handleDashBoard:()=>void,
    handleOpen:()=>void,
  }
const DesktopHeader: React.FC<DeskTopHeaderComponentProps> = ({
    cartData,
    handleCart,
    handleLogOut,
    handleDashBoard,
    handleOpen,
  })=>{
    const token = localStorage.getItem("token");
    const decodedToken = token
      ? jwtDecode<{ id: string; role: string }>(token)
      : { id: null, role: null };
return(
    <Box sx={{ display: { xs: "none", md: "flex" } }}>
    {token && decodedToken.role === "admin" && (
      <IconButton
        size="large"
        aria-label="show log out "
        color="inherit"
        onClick={handleLogOut}
      >
        <LogoutIcon />
      </IconButton>
    )}
    {decodedToken.role !== "admin" ? (
      <IconButton size="large" color="inherit" onClick={handleCart}>
        <Badge badgeContent={cartData.length} color="error">
          <AddShoppingCartIcon />
        </Badge>
      </IconButton>
    ) : (
      <IconButton
        size="large"
        color="inherit"
        onClick={handleDashBoard}
      >
        <DashboardIcon />
      </IconButton>
    )}

    <IconButton
      size="large"
      edge="end"
      aria-label="account of current user"
      aria-haspopup="true"
      onClick={handleOpen}
      color="inherit"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <AccountCircle />
    </IconButton>
    {decodedToken.role === "admin" ? (
      ""
    ) : token ? (
      <p style={{ fontSize: "10px" }}>Profile</p>
    ) : (
      <p style={{ fontSize: "10px" }}>Login</p>
    )}
  </Box>
)
}
export default DesktopHeader;