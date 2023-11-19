import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";

const Filter = ({ onFilterChange }) => {
  const [domain, setDomain] = useState("");
  const [gender, setGender] = useState("");
  const [availability, setAvailability] = useState("");

  //Responsive
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  //ONCHANGE FUNCTION DOR DOMAIN
  const handleDomainChange = (event) => {
    const value = event.target.value;
    setDomain(value);
    handleFilterChange("domain", value);
  };

  //ONCHANGE FUNCTION DOR GENDER
  const handleGenderChange = (event) => {
    const value = event.target.value;
    setGender(value);
    handleFilterChange("gender", value);
  };

  //ONCHANGE FUNCTION DOR AVAILABILITY
  const handleAvailabilityChange = (event) => {
    const value = event.target.value;
    setAvailability(value);
    handleFilterChange("available", value);
  };

  //ONCHANGE FUNCTION DOR FILTER
  const handleFilterChange = (filter, value) => {
    onFilterChange(filter, value);
  };
  return (
    <>
      <Box display={"flex"} justifyContent={"center"}>
        {/********* DOMAIN ********/}
        <FormControl
          sx={{ minWidth: isSmallScreen ? 100 : 120, margin: "5px" }}
        >
          <InputLabel id="domain">Domain</InputLabel>
          <Select
            labelId="domain"
            label="domain"
            value={domain}
            onChange={handleDomainChange}
          >
            <MenuItem value="IT">IT</MenuItem>
            <MenuItem value="Sales">Sales</MenuItem>
            <MenuItem value="Finance">Finance</MenuItem>
            <MenuItem value="Marketing">Marketing</MenuItem>
            <MenuItem value="UI Designing">UI Designing</MenuItem>
            <MenuItem value="Business Development">
              Business Development
            </MenuItem>
          </Select>
        </FormControl>

        {/********* GENDER ********/}
        <FormControl
          sx={{ minWidth: isSmallScreen ? 100 : 120, margin: "5px" }}
        >
          <InputLabel id="gender">Gender</InputLabel>
          <Select
            labelId="gender"
            label="Gender"
            value={gender}
            onChange={handleGenderChange}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Agender">Agender</MenuItem>
            <MenuItem value="Bigender">Bigender</MenuItem>
            <MenuItem value="Polygender">Polygender</MenuItem>
            <MenuItem value="Non-binary">Non-binary</MenuItem>
            <MenuItem value="Genderfluid">Genderfluid</MenuItem>
            <MenuItem value="Genderqueer">Genderqueer</MenuItem>
          </Select>
        </FormControl>

        {/********* AVAILABILITY ********/}
        <FormControl sx={{ minWidth: 120, margin: "5px" }}>
          <InputLabel id="availability">Availability</InputLabel>
          <Select
            labelId="availability"
            label="Availability"
            value={availability}
            onChange={handleAvailabilityChange}
          >
            <MenuItem value="True">Available</MenuItem>
            <MenuItem value="False">Not Available</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </>
  );
};

export default Filter;
