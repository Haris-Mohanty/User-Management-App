import React, { useState } from "react";
import UserCard from "./UserCard";
import {
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SearchUser from "./SearchUser";
import Filter from "../Filter";
import AddBoxSharpIcon from "@mui/icons-material/AddBoxSharp";

const UserList = ({ users, onFilterChange, setSelectedUsers, onIconClick }) => {
  const [searchQuery, setSearchQuery] = useState("");

  //FOR RESPONSIVE
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  //SEARCH BY NAME QUERY
  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  const filterUser = users.filter(
    (user) =>
      user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
          justifyContent: "space-evenly",
          mt: 10,
        }}
      >
        <SearchUser onSearch={handleSearch} />
        <IconButton onClick={onIconClick}>
          <AddBoxSharpIcon sx={{ fontSize: 29 }} />
          <Typography variant="body2">Create Team</Typography>
        </IconButton>
        <Filter onFilterChange={onFilterChange} />
      </Box>
      {/********* USER SHOW IN CARDS ********/}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          mt: 2,
        }}
      >
        {filterUser.length === 0 ? (
          <Typography variant="subtitle1" color="textSecondary" mt={8} mb={40}>
            No names found.
          </Typography>
        ) : (
          filterUser.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              setSelectedUsers={setSelectedUsers}
            />
          ))
        )}
      </Box>
    </Box>
  );
};

export default UserList;
