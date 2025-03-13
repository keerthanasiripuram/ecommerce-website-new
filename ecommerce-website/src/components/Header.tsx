import * as React from "react";
import { useCallback } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import MoreIcon from "@mui/icons-material/MoreVert";
import CloseIcon from "@mui/icons-material/Close";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Modal,
  TextField,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  MenuItem,
  Menu,
  InputAdornment,
} from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { Outlet } from "react-router-dom";
import { Search, StyledLink } from "../styledComponents/StyledComponent";
import Login from "../pages/SignIn";
import { useCart } from "../store/UseCartStore";
import Registration from "../pages/Registration";
import { useModal } from "../store/UseModalType";

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

type headerProps = {
  changeHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchQuery?: string;
  enable?: boolean;
};

const Header: React.FC<headerProps> = ({
  changeHandler,
  searchQuery,
  enable = true,
}) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decodedToken = token
    ? jwtDecode<{ id: string; role: string }>(token)
    : { id: null, role: null };

  const modalType = useModal((state) => state.modalData);

  const CartData = useCart((state) => state.cartData);
  const handleCart = () => {
    navigate("/add-to-cart");
  };

  //handle modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    if (token && decodedToken.role == "customer") {
      navigate("/profile");
    } else if (token && decodedToken.role == "admin") {
      navigate("/admin-operations");
    } else {
      setOpen(true);
    }
  };
  const handleClose = React.useCallback(() => setOpen(false), []);

  const handleDashBoard = () => {
    navigate("/admin-dashboard");
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = useCallback(() => {
    setMobileMoreAnchorEl(null);
  }, []);

  const handleMobileMenuOpen = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setMobileMoreAnchorEl(event.currentTarget);
    },
    [],
  );

  const menuId = "primary-search-account-menu";
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
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
            <Badge badgeContent={CartData.length} color="error">
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

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar>
          <Toolbar>
            <StyledLink sx={{ color: "white" }} component={RouterLink} to="/">
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            </StyledLink>
            <StyledLink component={RouterLink} to="/">
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: "none", sm: "block", color: "white" } }}
              >
                Shopping Website
              </Typography>
            </StyledLink>
            {enable && (
              <Search>
                <TextField
                  value={searchQuery}
                  onChange={changeHandler}
                  placeholder="Search product"
                  variant="outlined"
                  fullWidth
                  size="small"
                  sx={{
                    "& input": {
                      color: "white",
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon style={{ color: "#ffffff" }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Search>
            )}
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {token && decodedToken.role === "admin" ? (
                <IconButton
                  size="large"
                  aria-label="show log out "
                  color="inherit"
                  onClick={handleLogOut}
                >
                  <LogoutIcon />
                </IconButton>
              ) : (
                ""
              )}
              {decodedToken.role !== "admin" ? (
                <IconButton size="large" color="inherit" onClick={handleCart}>
                  <Badge badgeContent={CartData.length} color="error">
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
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
      </Box>

      {/* modal to display register or login based on modaltype*/}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton
            onClick={handleClose}
            style={{
              position: "absolute",
              top: 8,
              right: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
          {modalType.type === "sign-in" ? (
            <Login onClose={handleClose} />
          ) : (
            <Registration onClose={handleClose} />
          )}
        </Box>
      </Modal>

      {/* display body content */}
      <Box sx={{ marginTop: "50px" }}>
        <Outlet />
      </Box>
    </>
  );
};
export default React.memo(Header);
