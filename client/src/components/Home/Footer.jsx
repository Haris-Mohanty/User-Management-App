import { Box, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <>
      <Box
        sx={{
          bgcolor: "#424242",
          p: 2,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box>
          <Typography variant="h5" sx={{ color: "#fff" }}>
            All rights reserved &copy; User!
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Footer;
