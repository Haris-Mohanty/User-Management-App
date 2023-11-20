import React, { useState, useEffect } from "react";
import { createTeam, fetchUser } from "../api/api";
import UserList from "./User/UserList";
import Pagination from "./User/Pagination";
import { Box } from "@mui/material";
import TeamForm from "./Team/Team";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ShowUser = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({});
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // GET USER DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchUser(currentPage, filters);
        setUsers(response.users);
        setTotalPages(response.totalPages);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [currentPage, filters]);

  //PAGE CLICK
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  //FILTER CHANGE
  const handleFilterChange = (filter, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filter]: value }));
    setCurrentPage(1);
    setSelectedUsers([]);
  };

  //CREATE TEAM (API CALL)
  const handleCreateTeam = (teamName, memberIds) => {
    createTeam(teamName, memberIds)
      .then((res) => toast.success(res.message))
      .catch((err) => toast.error(err.response.data.message));
  };

  //DIALOG CONTROL
  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <Box>
      <ToastContainer />
      <UserList
        users={users}
        onFilterChange={handleFilterChange}
        setSelectedUsers={setSelectedUsers}
        onIconClick={handleOpenDialog}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {/*************** SHOW TEAM CREATING FORM ***********/}
      {selectedUsers.length > 0 && (
        <TeamForm
          selectedUsers={selectedUsers}
          onCreateTeam={handleCreateTeam}
          isOpen={isDialogOpen}
          onClose={handleCloseDialog}
        />
      )}
    </Box>
  );
};

export default ShowUser;
