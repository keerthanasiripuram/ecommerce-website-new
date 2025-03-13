import React from "react";
import { Box, CssBaseline, Drawer, Toolbar } from "@mui/material";

interface pageLayoutProps {
  children: React.ReactNode;
}

const drawerWidth = 250;

const PageLayout = ({ children }: pageLayoutProps) => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline></CssBaseline>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, position: "static" },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto", padding: "0px 30px" }}>
          {children && Array.isArray(children) && children[0]}
        </Box>
      </Drawer>
      {/* Main Content */}
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3, m: 0 }}
      >
        {children && Array.isArray(children) && children[1]}
      </Box>
    </Box>
  );
};

export default React.memo(PageLayout);
