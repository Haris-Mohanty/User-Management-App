import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const Header = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Box>
        <AppBar component={"div"} sx={{ bgcolor: "#424242" }}>
          <Toolbar>
            <Box m={"auto"} width={isSmallScreen ? "100%" : "25%"}>
              <Typography variant={isSmallScreen ? "h5" : "h4"}>
                User Management App
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Header;
