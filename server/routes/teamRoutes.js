import express from "express";
import { createNewTeam, getTeamById } from "../controllers/teamController.js";

//Router Obj
const router = express.Router();

//******* CREATE ROUTES *****/

//Crate team
router.post("/", createNewTeam);

//Retrieve the details of a specific team by ID
router.get("/:id", getTeamById);

//Export
export default router;
