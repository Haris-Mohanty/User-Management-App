import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

const UserCard = ({ user, setSelectedUsers }) => {
  const [isSelected, setIsSelected] = useState(false);

  // ADD TO TEAM BUTTON || REMOVE FROM TEAM
  const handleAddToTeam = () => {
    setIsSelected(!isSelected);
    setSelectedUsers((prevSelected) =>
      isSelected
        ? prevSelected.filter((userId) => userId !== user._id)
        : [...prevSelected, user._id]
    );
  };

  //Available color change dynamically
  const getStatusColor = () => {
    return user.available ? "#00FF33" : "#FF0000";
  };

  return (
    <Card
      sx={{
        margin: 1,
        width: 265,
        height: 290,
        borderRadius: 3,
        transition: "transform 0.2s ease-in-out",
        ":hover": {
          transform: "scale(1.02)",
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
        },
      }}
    >
      <CardContent>
        <Box display={"flex"} justifyContent={"space-around"} mb={2}>
          <Avatar
            alt={user.first_name}
            src={user.avatar}
            sx={{
              height: "18%",
              width: "25%",
              backgroundColor: "#4caf50",
              transition: "opacity 0.2s ease-in-out",
              ":hover": { opacity: 0.8 },
            }}
          />
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            fontWeight={"bold"}
          >
            ID: {user.id}
          </Typography>
        </Box>
        <Typography
          gutterBottom
          variant="subtitle2"
          component="div"
          display={"flex"}
          justifyContent={"center"}
        >
          Email: {user.email}
        </Typography>
        <Typography
          gutterBottom
          variant="body2"
          component="div"
          textAlign={"center"}
          sx={{ color: "magenta" }}
        >
          Name: {`${user.first_name} ${user.last_name}`}
        </Typography>
        <Typography
          gutterBottom
          variant="body2"
          component="div"
          textAlign={"center"}
        >
          Gender: {user.gender}
        </Typography>
        <Box display={"flex"} justifyContent={"space-around"}>
          <Typography gutterBottom variant="body2" component="div">
            Domain: {user.domain}
          </Typography>
          <Typography
            gutterBottom
            variant="body2"
            component="div"
            sx={{ color: getStatusColor(), fontWeight: "bold" }}
          >
            {user.available ? "Available" : "Not Available"}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="info"
          sx={{ m: "auto" }}
          size="small"
          onClick={handleAddToTeam}
        >
          {isSelected ? "Remove from Team" : "Add to Team"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default UserCard;
