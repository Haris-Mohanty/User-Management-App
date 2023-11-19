import React, { useState } from "react";
import UserCard from "./UserCard";
import { Box, Typography } from "@mui/material";
import SearchUser from "./SearchUser";

const UserList = ({ users }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  //Filter user
  const filterUser = users.filter(
    (user) =>
      user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <SearchUser onSearch={handleSearch} />
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
          <Typography variant="subtitle1" color="textSecondary" mt={8} mb={39}>
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
