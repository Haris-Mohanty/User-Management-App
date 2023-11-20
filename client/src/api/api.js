import axios from "axios";

// ***************** GET USER *********************/
export const fetchUser = async (page, filters) => {
  try {
    const response = await axios.get("/users", {
      params: {
        page,
        ...filters,
      },
    });

    // Check the status of the response
    if (response.status === 200) {
      const userData = response.data;
      return userData;
    } else {
      throw new Error("Unexcepted error occured!");
    }
  } catch (err) {
    throw err;
  }
};

// ******************** CREATE TEAM ***************/
export const createTeam = async (teamName, memberIds) => {
  try {
    const response = await axios.post("/team", {
      teamName: teamName,
      memberIds: memberIds,
    });

    if (response.status === 201) {
      const resData = await response.data;
      return resData;
    } else {
      throw new Error("Unexcepted error occured!");
    }
  } catch (err) {
    throw err;
  }
};

// ****************** SHOW TEAM DETAILS ******************/
export const fetchTeamDetails = async () => {
  try {
    const response = await axios.get("/team");

    if (response.status === 200) {
      const resData = await response.data;
      return resData;
    } else {
      throw new Error("Unexcepted error occured!");
    }
  } catch (err) {
    throw err;
  }
};
