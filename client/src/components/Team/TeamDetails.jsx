import React, { useEffect, useState } from "react";
import { fetchTeamDetails } from "../../api/api";
import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";

const TeamDetails = () => {
  const [teamDetails, setTeamDetails] = useState([]);
  useEffect(() => {
    fetchTeamDetails()
      .then((res) => setTeamDetails(res.getAllTeams))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box sx={{ mt: 7 }}>
      {teamDetails.map((team) => (
        <Card key={team._id}>
          <CardContent>
            <Typography
              variant="h5"
              sx={{
                mt: 2,
                mb: 2,
                fontFamily: "verdana",
                fontWeight: "bold",
                textAlign: "center",
                fontSize: 27,
              }}
            >
              Team Name: {team.teamName}
            </Typography>
            <Typography
              variant="body2"
              component={"div"}
              sx={{ mb: 3, textAlign: "center", fontSize: 20 }}
            >
              Members:{" "}
              <Box display="flex" flexWrap="wrap" justifyContent="center">
                {team.members.map((member) => (
                  <Card
                    key={member._id}
                    sx={{
                      margin: 1,
                      width: 265,
                      height: 250,
                      borderRadius: 3,
                      transition: "transform 0.2s ease-in-out",
                      ":hover": {
                        transform: "scale(1.03)",
                        boxShadow:
                          "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
                      },
                    }}
                  >
                    <CardContent>
                      <Box
                        display={"flex"}
                        justifyContent={"space-around"}
                        mb={2}
                      >
                        <Avatar
                          alt={member.first_name}
                          src={member.avatar}
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
                          ID: {member.id}
                        </Typography>
                      </Box>
                      <Typography
                        gutterBottom
                        variant="subtitle2"
                        component="div"
                        textAlign={"center"}
                      >
                        Email: {member.email}
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="body2"
                        component="div"
                        textAlign={"center"}
                        sx={{ color: "magenta" }}
                      >
                        Name: {`${member.first_name} ${member.last_name}`}
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="body2"
                        component="div"
                        textAlign={"center"}
                      >
                        Gender: {member.gender}
                      </Typography>

                      <Typography
                        gutterBottom
                        variant="body2"
                        component="div"
                        textAlign={"center"}
                      >
                        Domain: {member.domain}
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="body2"
                        component="div"
                        textAlign={"center"}
                      >
                        Available: {member.available ? "Yes" : "No"}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default TeamDetails;
