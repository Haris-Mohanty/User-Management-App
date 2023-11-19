import React, { useState } from "react";
import UserCard from "./UserCard";
import { Box, Typography } from "@mui/material";
import SearchUser from "./SearchUser";
import Filter from "../Filter";

const UserList = ({ users, onFilterChange }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  //Search by name
  const filterUser = users.filter(
    (user) =>
      user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-around", mt: 4 }}>
        <SearchUser onSearch={handleSearch} />
        <Filter onFilterChange={onFilterChange} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          mt: 3,
        }}
      >
        {filterUser.length === 0 ? (
          <Typography variant="subtitle1" color="textSecondary" mt={8} mb={40}>
            No names found.
          </Typography>
        ) : (
          filterUser.map((user) => <UserCard key={user._id} user={user} />)
        )}
      </Box>
    </Box>
  );
};

export default UserList;
