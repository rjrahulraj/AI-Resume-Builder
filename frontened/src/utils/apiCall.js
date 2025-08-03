const BACKEND_URL = import.meta.env.VITE_BACKENED_URL;

export const getUserDetails = async (token) => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/user-details`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });

    const data = await response.json();
    //     console.log(data);

    if (!data.success) {
      throw new Error(data.message);
    }

    return data.userDetails;
  } catch (error) {
    console.error(`Error fetching user details: ${error}`);
    throw new Error(error.message || "Failed to fetch user details");
  }
};
