import express from "express";
import {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/userController.js";

//Router Object
const router = express.Router();

//******** Create Routes ******/

//Create a new user
router.post("/", createUser);

// Retrieve all users
router.get("/", getAllUsers);

//Retrieve a specific user by id
router.get("/:id", getUser);

//Update an existing user
router.put("/:id", updateUser);

export default router;
