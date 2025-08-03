require("dotenv").config();

const express = require("express");
const colors = require("colors");
const authRoute = require("./routes/authRoute");
const utilRoute = require("./routes/utilRoute");
const resumeRoute = require("./routes/resumeRoute");
const connect_DB = require("./DB/db");
const app = express();
const port = process.env.PORT;
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("welcome");
});

// route;
app.use("/api", utilRoute); // utils route
app.use("/api/resume", resumeRoute); // resume route
app.use("/api/auth", authRoute); // auth route

connect_DB().then(() => {
  console.log(`DB connect Succesfully`.rainbow);
  app.listen(port, () => {
    console.log(`Server Start at ${port}`.rainbow);
  });
});
