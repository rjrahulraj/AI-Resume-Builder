const mongoose = require("mongoose");
const MONGO_DB_URL = process.env.MONGODB_URL;

const connect_DB = async () => {
  try {
    return mongoose.connect(MONGO_DB_URL);
  } catch (error) {
    console.log(`Error in connecting DB :: ${error}`);
  }
};

module.exports = connect_DB;
