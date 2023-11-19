import React from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";

const UserCard = ({ user }) => {
  return (
    <Card
      sx={{
        margin: 1,
        width: 250,
        height: 270,
        borderRadius: 3,
        ":hover": {
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
              width: "27%",
              backgroundColor: "#4caf50",
              transition: "opacity 0.2s ease-in-out",
              ":hover": { opacity: 0.8 },
            }}
          />
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            fontWeight={"bold"}
          >
            ID: {user.id}
          </Typography>
        </Box>
        <Typography
          gutterBottom
          variant="body2"
          component="div"
          display={"flex"}
          justifyContent={"center"}
        >
          Email: {user.email}
        </Typography>
        <Typography gutterBottom variant="body2" component="div" sx={{ ml: 6 }}>
          Gender: {user.gender}
        </Typography>
        <Box display={"flex"} justifyContent={"space-around"}>
          <Typography gutterBottom variant="body2" component="div">
            Domain: {user.domain}
          </Typography>
          <Typography gutterBottom variant="body2" component="div">
            Available: {user.available ? "Yes" : "No"}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="info"
          sx={{ m: "auto" }}
          size="small"
        >
          Add to Team
        </Button>
      </CardActions>
    </Card>
  );
};

export default UserCard;
