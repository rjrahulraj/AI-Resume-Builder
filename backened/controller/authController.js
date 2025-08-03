const User = require("../DB/models/user-model");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  try {
    let { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({
        success: false,
        message: "please send all credentails",
      });
      return;
    }

    const userExist = await User.findOne({ email });

    // console.log("1");
    if (userExist) {
      res.status(400).json({
        success: false,
        message: "Email already exist !!! Try with another email",
      });
      return;
    }

    // console.log("2");
    // encrpting the password;
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    // console.log("3");
    const newUser = await User.create({ name, email, password });
    // console.log("4");
    if (!newUser) {
      res.status(400).json({
        success: false,
        message: "Error in register !!! Please try After some times",
      });
      return;
    }
    // console.log("newUser : ", newUser);
    let token = await newUser.generateToken();
    res.status(201).json({
      success: true,
      message: "User successfully Created !!!",
      userDetails: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
      token: `Bearer ${token}`,
    });
  } catch (error) {
    console.log(`Error in sign up in authController :: ${error}`);
    res.status(400).json({
      success: false,
      message: error.message,
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "please send all credentails",
      });
      return;
    }

    const userExist = await User.findOne({ email });
    if (!userExist) {
      res.status(400).json({
        success: false,
        message: "Email does not exist !!! sign up",
      });
      return;
    }

    let comPass = await bcrypt.compare(password, userExist.password);

    if (!comPass) {
      res.status(400).json({
        success: false,
        message: "password incorrect",
      });
      return;
    }

    let token = await userExist.generateToken();
    res.status(200).json({
      success: true,
      message: "User successfully login !!!",
      userDetails: {
        _id: userExist._id,
        name: userExist.name,
        email: userExist.email,
      },
      token: `Bearer ${token}`,
    });
  } catch (error) {
    console.log(`Error in login in authController :: ${error}`);
    res.status(400).json({
      success: false,
      message: error.message,
      error: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
