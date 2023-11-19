import React from "react";
import UserCard from "./UserCard";
import { Box } from "@mui/material";

const UserList = ({ users }) => {
  return (
    <Box
      className="user-list"
      sx={{ display: "flex", flexWrap: "wrap", justifyContent:"center", mt:5}}
    >
      {users.map((user) => (
        <UserCard key={user._id} user={user} />
      ))}
    </Box>
  );
};

export default UserList;
