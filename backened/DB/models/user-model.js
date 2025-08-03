const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = bcrypt.hash(this.password, salt);
  } catch (error) {
    console.log("err at modifing the password in user-models", error);
  }
});

UserSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        id: this._id.toString(),
        email: this.email,
      },
      process.env.JWT_SIGN_KEY,
      {
        expiresIn: "30d",
      }
    );
  } catch (error) {
    console.log(`Error in generateToken password in usermodel ${error}`);
  }
};

UserSchema.methods.comparePassword = async function (password) {
  try {
    return bcrypt.compare(password, this.password);
  } catch (error) {
    console.log(`Error in compare bcryptjs password in usermodel ${error}`);
  }
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
