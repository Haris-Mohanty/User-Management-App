import teamModel from "../models/teamModel.js";
import userModel from "../models/userModel.js";

//*** Create a new team by selecting users from the list with unique domains and availability ***/
export const createNewTeam = async (req, res, next) => {
  try {
    const { teamName, memberIds } = req.body;

    //Validation
    if (!teamName) {
      return res.status(422).json({
        message: "Please add Team Name!",
      });
    }

    //Check existing teams
    const existingTeam = await teamModel.findOne({ teamName });
    if (existingTeam) {
      return res.status(409).json({
        message:
          "Team name is already taken. Please provide a unique team name!",
      });
    }

    //Find member by (memberid)
    const getMember = await userModel.find({ _id: { $in: memberIds } });

    // Check if all members are found
    if (getMember.length !== memberIds.length) {
      return res.status(422).json({
        message: "Some selected members not found!",
      });
    }

    // Check for unique domains and availability
    const uniqueDomains = new Set(getMember.map((member) => member.domain));
    const uniqueAvailabilities = new Set(
      getMember.map((member) => member.available)
    );
    if (
      uniqueDomains.size !== getMember.length ||
      uniqueAvailabilities.size !== 1
    ) {
      return res.status(422).json({
        message:
          "Selected members should have unique domains and availability!",
      });
    }

    //Create new team
    const newTeam = new teamModel({
      teamName,
      members: getMember.map((member) => member._id),
    });
    await newTeam.save();

    // Update team field in users
    for (const member of getMember) {
      member.team = newTeam._id;
      await member.save();
    }

    //Success res
    return res.status(201).json({
      message: "Team created successfully!",
      team: newTeam,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

//*************** RETRIEVE THE DETAILS OF A SPECIFIC TEAM BY ID **************/
export const getTeamById = async (req, res, next) => {
  try {
    const teamId = req.params.id;

    const getTeamDetails = await teamModel.findById(teamId).populate("members");

    //Validation
    if (!getTeamDetails) {
      return res.status(404).json({
        message: "Team not found",
      });
    }

    //Success
    return res.status(200).json({
      getTeamDetails,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

//*************** RETRIEVE THE DETAILS OF ALL TEAM **************/
export const getAllTeam = async (req, res, next) => {
  try {
    const getAllTeams = await teamModel.find().populate("members");

    //Validation
    if (!getAllTeams) {
      return res.status(404).json({
        message: "Team not found",
      });
    }

    //Success
    return res.status(200).json({
      getAllTeams,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};
