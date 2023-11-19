import React, { useState, useEffect } from "react";
import { fetchUser } from "../api/api";
import UserList from "./User/UserList";
import Pagination from "./User/Pagination";
import { Box } from "@mui/material";

const ShowUser = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({});

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
  };

  return (
    <Box>
      <h1>User List</h1>
      <UserList users={users} onFilterChange={handleFilterChange} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </Box>
  );
};

export default ShowUser;
