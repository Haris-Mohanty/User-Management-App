import userModel from "../models/userModel.js";

//************ CREATE A NEW USER ****************/
export const createUser = async (req, res, next) => {
  try {
    //Destructure from body
    const { first_name, last_name, email, gender, avatar, domain, available } =
      req.body;

    //Validation
    if (!first_name || !last_name || !email || !gender || !avatar || !domain) {
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

    //Existing Email Check
    const existingEmail = await userModel.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({
        message: "Email already exists. Please provide a unique Email!",
      });
    }

    //ID of user automatically added(latest one)
    const latestId = await userModel.findOne().sort({ id: -1 });
    const nextId = latestId ? latestId.id + 1 : 1;

    //User create
    const user = new userModel({
      id: nextId,
      first_name,
      last_name,
      email,
      gender,
      avatar,
      domain,
      available,
    });
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

//************ RETRIEVE ALL USERS WITH PAGINATION SUPPORT(FILTER, SEARCH) ****************/
export const getAllUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 20;

    //Calculate skip value
    const skip = (page - 1) * limit;

    //Filter
    const filters = {};

    //Filter By Domain
    if (req.query.domain) {
      filters.domain = new RegExp(req.query.domain, "i");
    }

    //Filter By Gender
    if (req.query.gender) {
      filters.gender = new RegExp(`^${req.query.gender}$`, "i");
    }

    //Filter By Availability
    if (req.query.available !== undefined) {
      filters.available = req.query.available.toLowerCase() === "true";
    }

    //Search User By Name (Implement searching logic to search for users by their names)
    if (req.query.first_name) {
      filters.first_name = new RegExp(`^${req.query.first_name}$`, "i");
    }
    if (req.query.last_name) {
      filters.last_name = new RegExp(`^${req.query.last_name}$`, "i");
    }

    //Get total user for counting total pages
    const totalUser = await userModel.countDocuments(filters);
    const totalPages = Math.ceil(totalUser / limit);
    if (page > totalPages) {
      return res.status(404).json({
        message: "Page not Found!",
      });
    }

    //Find users by pagination
    const users = await userModel.find(filters).skip(skip).limit(limit);

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

//************* RETRIEVE A SPECIFIC USER BY ID ***********/
export const getUser = async (req, res, next) => {
  try {
    const id = req.params.id;

    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({
        message: "User Not Found!",
      });
    }

    return res.status(200).json({
      user,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

//****************** UPDATE AN EXISTING USER *************/
export const updateUser = async (req, res, next) => {
  try {
    //Get id
    const id = req.params.id;

    const { first_name, last_name, email, gender, avatar, domain, available } =
      req.body;

    //Validation
    if (!first_name || !last_name || !email || !gender || !avatar || !domain) {
      return res.status(422).json({
        message: "Please provide all fields!",
      });
    }

    //Check user
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({
        message: "User Not Found!",
      });
    }

    // Check if the email is being updated to an existing email for another user
    const existingEmail = await userModel.findOne({ email, _id: { $ne: id } });
    if (existingEmail) {
      return res.status(409).json({
        message:
          "Email already exists for another user. Please provide a unique Email!",
      });
    }

    //Update user
    const updatedUser = await userModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return res.status(200).json({
      message: "User Updated Successfully!",
      updatedUser,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};

//******************* DELETE A USER **************/
export const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;

    //delete user
    const deletedUser = await userModel.findOneAndDelete({ _id: id });
    if (!deletedUser) {
      return res.status(404).json({
        message: "User Not Found!",
      });
    }

    //Success response
    return res.status(201).json({
      message: "User Deleted Successfully!",
      deletedUser,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      error: err.message,
    });
  }
};
