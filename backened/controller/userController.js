const User = require("../DB/models/user-model");

const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.userDetails.id }).select(
      "-password"
    );
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      userDetails: user,
    });
  } catch (error) {
    console.log(`Error in getUserDetails in userController :: ${error}`);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = { getUserDetails };
