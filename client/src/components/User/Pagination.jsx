import { Button, ButtonGroup } from "@mui/material";
import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const displayPages = 3;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const startPage = Math.max(1, currentPage - displayPages);
  const endPage = Math.min(totalPages, currentPage + displayPages);

  return (
    <ButtonGroup
      sx={{ mb: 4, mt: 2, display: "flex", justifyContent: "center" }}
    >
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {"<"}
      </Button>
      {pages.slice(startPage - 1, endPage).map((page) => (
        <Button
          key={page}
          onClick={() => onPageChange(page)}
          variant={page === currentPage ? "contained" : "outlined"}
        >
          {page}
        </Button>
      ))}
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {">"}
      </Button>
    </ButtonGroup>
  );
};
export default Pagination;
