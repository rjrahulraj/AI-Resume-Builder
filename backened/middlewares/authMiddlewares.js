const jwt = require("jsonwebtoken");

const authentication = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      res.status(400).json({
        success: false,
        message: "token is missing !!!",
      });
      return;
    }
    const token = req.headers.authorization.split(" ")[1];
    // console.log(token);
    // console.log(req.headers.authorization);

    const userDetails = jwt.verify(token, process.env.JWT_SIGN_KEY);
    // console.log(userDetails);
    if (!userDetails) {
      res.status(400).json({
        success: false,
        message: "Invalid Token !!!",
      });
      return;
    }
    // console.log(userDetails);
    req.userDetails = userDetails;
    next();
  } catch (error) {
    console.log(`Error in authenication in authMiddlewares :: ${error}`);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = authentication;
