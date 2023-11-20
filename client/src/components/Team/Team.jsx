import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import GroupAddIcon from '@mui/icons-material/GroupAdd';

const TeamForm = ({ selectedUsers, onCreateTeam, isOpen, onClose }) => {
  const [teamName, setTeamName] = useState("");

  const handleCreateTeam = () => {
    onCreateTeam(teamName, selectedUsers);
    setTeamName(""); // Clear the team name field after creating the team
    onClose(); //close modal
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <Box p={3}>
        <DialogTitle sx={{ textAlign: "center" }}>
          <Typography
            sx={{ fontFamily: "verdana", fontWeight: "bold", fontSize: 23 }}
          >
            Create Team
          </Typography>
        </DialogTitle>
        <hr />
        <Box mb={3} mt={1}>
          <Typography variant="subtitle1" mb={2}>
            Selected Users:
          </Typography>
          <ul sx={{ listStyleType: "none", padding: 0 }}>
            {selectedUsers.map((userId) => (
              <li
                key={userId}
                style={{
                  marginBottom: "8px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ marginRight: "8px" }}>
                  <GroupAddIcon sx={{ fontSize: 23 }} />
                </Avatar>
                <Typography variant="body1">{userId}</Typography>
              </li>
            ))}
          </ul>
        </Box>
        <TextField
          label="Team Name"
          variant="outlined"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateTeam}
          fullWidth
          sx={{ mt: 2 }}
        >
          Create Team
        </Button>
      </Box>
    </Dialog>
  );
};

export default TeamForm;
