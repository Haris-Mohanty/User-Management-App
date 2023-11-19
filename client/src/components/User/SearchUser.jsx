import React from "react";
import { Box, TextField } from "@mui/material";

const SearchUser = ({ onSearch }) => {
  const handleSearch = (e) => {
    const query = e.target.value;
    onSearch(query);
  };
  return (
    <Box sx={{ p: 1 }}>
      <TextField
        label="Search By Name"
        variant="outlined"
        onChange={handleSearch}
      />
    </Box>
  );
};

export default SearchUser;
