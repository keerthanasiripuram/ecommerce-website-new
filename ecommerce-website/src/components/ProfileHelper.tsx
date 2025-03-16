import { Box, Button, Card, Container } from "@mui/material";
import ViewOrders1 from "../pages/ViewOrders1";
import { useNavigate } from "react-router";
type ProfileHelperProps={
    handleOpen:()=>void,
    userName:string
}
const ProfileHelper=({handleOpen,userName}:ProfileHelperProps)=>{
    const navigate = useNavigate();
      //handle logout
  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  }
    return(
        <Card sx={{ display: "flex", m: 3, p: 1 }}>
        <Container sx={{ width: "30%", marginLeft: 0 }}>
          <Box
            style={{
              height: "30px",
              borderBottom: "1px solid black",
              padding: "10px",
            }}
          >
            {userName}
          </Box>
          <Box
            style={{
              height: "60px",
              borderBottom: "1px solid black",
              display: "flex",
            }}
          >
            <Button
              variant="contained"
              color="success"
              style={{ flex: 1, height: "30px", marginTop: "30px" }}
            >
              Orders
            </Button>
          </Box>
          <Box
            sx={{
              height: "60px",
              borderBottom: "1px solid black",
              display: "flex",
            }}
          >
            <Button
              variant="contained"
              onClick={handleOpen}
              style={{ flex: 1, height: "30px", marginTop: "30px" }}
            >
              Manage Profile
            </Button>
          </Box>
          <Box
            style={{
              height: "60px",
              borderBottom: "1px solid black",
              display: "flex",
            }}
          >
            <Button
              variant="contained"
              color="error"
              onClick={handleLogOut}
              style={{ flex: 1, height: "30px", marginTop: "30px" }}
            >
              Log Out
            </Button>
          </Box>
        </Container>
        <Container
          style={{ width: "70%", backgroundColor: "grey", padding: "10px" }}
        >
          <ViewOrders1 />
        </Container>
      </Card>
    )
}
export default ProfileHelper;