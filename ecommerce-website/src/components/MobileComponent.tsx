
import { Badge, IconButton, Menu, MenuItem } from "@mui/material";
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
interface MobileComponentProps {
    cartData:CartData[],
    handleCart:()=>void,
    handleLogOut:()=>void,
    handleDashBoard:()=>void,
    handleOpen:()=>void,
    mobileMoreAnchorEl: null | HTMLElement; // The element that triggers the mobile menu
    setMobileMoreAnchorEl: React.Dispatch<React.SetStateAction<null | HTMLElement>>; 
  }
  
  const MobileComponent: React.FC<MobileComponentProps> = ({
    cartData,
    handleCart,
    handleLogOut,
    handleDashBoard,
    handleOpen,
    mobileMoreAnchorEl,
    setMobileMoreAnchorEl,
  })=>{
    const token = localStorage.getItem("token");
    const decodedToken = token
      ? jwtDecode<{ id: string; role: string }>(token)
      : { id: null, role: null };
      const mobileMenuId = "primary-search-account-menu-mobile";

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);


  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = useCallback(() => {
    setMobileMoreAnchorEl(null);
  }, []);

  
    return(
        <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        <MenuItem>
          {token && decodedToken.role === "admin" && (
            <IconButton
              size="large"
              aria-label="show logout "
              color="inherit"
              onClick={handleLogOut}
            >
              <LogoutIcon />
            </IconButton>
          )}
        </MenuItem>
        <MenuItem>
          {decodedToken.role !== "admin" ? (
            <IconButton
              size="large"
              aria-label="show cart number"
              color="inherit"
              onClick={handleCart}
            >
              <Badge badgeContent={cartData.length} color="error">
                <AddShoppingCartIcon />
              </Badge>
            </IconButton>
          ) : (
            <IconButton
              size="large"
              aria-label="show dash board"
              color="inherit"
              onClick={handleDashBoard}
            >
              <DashboardIcon />
            </IconButton>
          )}
        </MenuItem>
        <MenuItem>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            onClick={handleOpen}
            color="inherit"
            style={{ display: "flex" }}
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
        </MenuItem>
      </Menu>
    );
  }

  export default MobileComponent;