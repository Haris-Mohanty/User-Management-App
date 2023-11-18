import express from "express";
import { createNewTeam } from "../controllers/teamController.js";

//Router Obj
const router = express.Router();

//******* CREATE ROUTES *****/

//Crate team
router.post("/", createNewTeam);

//Export
export default router;
