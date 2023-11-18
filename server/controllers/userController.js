import userModel from "../models/userModel.js";

//************ CREATE USER ****************/
export const createUser = async (req, res, next) => {
  try {
    //Destructure from body
    const {
      id,
      first_name,
      last_name,
      email,
      gender,
      avatar,
      domain,
      available,
    } = req.body;

    //Validation
    if (
      !id ||
      !first_name ||
      !last_name ||
      !email ||
      !gender ||
      !avatar ||
      !domain ||
      !available
    ) {
      return res.status(422).json({
        message: "Please provide all fields!",
      });
    }

    //Email Validate
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(422).json({
        message: "Please provide a valid Email!",
      });
    }

    //Existing ID Check
    const existingId = await userModel.findOne({ id });
    if (existingId) {
      return res.status(409).json({
        message: "ID already exists. Please provide a unique ID!",
      });
    }

    //Existing Email Check
    const existingEmail = await userModel.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({
        message: "Email already exists. Please provide a unique Email!",
      });
    }

    //User create
    const user = new userModel(req.body);
    await user.save();
    return res.status(201).json({
      message: "User Created Successfully!",
      user,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

//************ GET ALL USERS ****************/
export const getAllUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 20;

    //Calculate skip value
    const skip = (page - 1) * limit;

    //Get total user for counting total pages
    const totalUser = await userModel.countDocuments();
    const totalPages = Math.ceil(totalUser / limit);
    if (page > totalPages) {
      return res.status(404).json({
        message: "Page not Found!",
      });
    }

    //Find users by pagination
    const users = await userModel.find().skip(skip).limit(limit);

    //Validation
    if (!users || users.length === 0) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }
    console.log(users.length);

    //Success res
    return res.status(200).json({
      users,
      currentPage: page,
      totalPages,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};
