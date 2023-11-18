import express from "express";
import { createUser, getAllUsers } from "../controllers/userController.js";

//Router Object
const router = express.Router();

//******** Create Routes ******/

//Create user
router.post("/", createUser);

//Get user
router.get("/", getAllUsers);

export default router;
