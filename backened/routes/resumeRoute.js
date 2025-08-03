const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/authMiddlewares");
// const upload = require("../middlewares/uploadMiddlewares");
const {
  getResumeDetailsByResumeId,
  createResume,
  getResumeByUserId,
  updateResume,
  deleteResume,
} = require("../controller/resumeController");
router.post("/", authentication, createResume);
router.get("/", authentication, getResumeByUserId);
router.get("/:id", authentication, getResumeDetailsByResumeId);
router.put("/:id", authentication, updateResume);
router.delete("/:id", authentication, deleteResume);

module.exports = router;
