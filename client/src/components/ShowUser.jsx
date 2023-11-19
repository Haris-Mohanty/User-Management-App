import React, { useState, useEffect } from "react";
import { fetchUser } from "../api/api";
import UserList from "./User/UserList";
import Pagination from "./User/Pagination";

const ShowUser = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchUser(currentPage)
      .then((res) => {
        setUsers(res.users);
        setTotalPages(res.totalPages);
      })
      .catch((err) => console.log(err));
    fetchUser();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="show-user">
      <h1>User List</h1>
      <UserList users={users} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ShowUser;
