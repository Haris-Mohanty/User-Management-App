import axios from "axios";

/***************** GET USER *********************/
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
      // Handle unexpected status codes
      console.error("Unexpected Error Occurred:", response.statusText);
      return null;
    }
  } catch (error) {
    // Handle network or other errors
    console.error("Error Occurred:", error.message);
    return null;
  }
};
