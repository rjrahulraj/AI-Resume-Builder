const Resume = require("../DB/models/resume-model");
const fs = require("fs");
const path = require("path");
const lodash = require("lodash");

const createResume = async (req, res) => {
  try {
    const title = req.body.title;

    // Default template
    const defaultResumeData = {
      profileInfo: {
        profileImg: null,
        previewUrl: "",
        fullName: "",
        designation: "",
        summary: "",
      },
      contactInfo: {
        email: "",
        phone: "",
        location: "",
        linkedin: "",
        github: "",
        website: "",
      },
      workExperience: [
        {
          company: "",
          role: "",
          startDate: "",
          endDate: "",
          description: "",
          location: "",
        },
      ],
      education: [
        {
          degree: "",
          institution: "",
          startDate: "",
          endDate: "",
        },
      ],
      skills: [
        {
          name: "",
          progress: 0,
        },
      ],
      projects: [
        {
          title: "",
          description: "",
          github: "",
          liveDemo: "",
        },
      ],
      certifications: [
        {
          title: "",
          issuer: "",
          year: "",
        },
      ],
      languages: [
        {
          name: "",
          progress: "",
        },
      ],
      interests: [""],
    };

    const newResume = await Resume.create({
      title: title || "My Resume",
      userId: req.userDetails.id,
      ...defaultResumeData,
      ...req.body,
    });

    if (!newResume) {
      return res.status(400).json({
        success: false,
        message: "Error in creating resume. Please try again later.",
        error: "Resume creation failed",
      });
    }

    res.status(201).json({
      success: true,
      message: "Resume created successfully",
      resumeId: newResume._id,
      resume: newResume,
    });
  } catch (error) {
    console.log(`Error in createResume in resumeController :: ${error}`);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getResumeDetailsByResumeId = async (req, res) => {
  try {
    const resumeId = req.params.id ? req.params.id : req.body.resumeId;
    if (!resumeId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }
    const resume = await Resume.findOne({ _id: resumeId });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    res.status(200).json({
      success: true,
      data: resume,
    });
  } catch (error) {
    console.log(`Error in getResumeDetails in resumeController :: ${error}`);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getResumeByUserId = async (req, res) => {
  try {
    const userId = req.userDetails.id;
    const resumes = await Resume.find({ userId }).sort({
      updatedAt: -1,
    });

    res.status(200).json({
      success: true,
      resumes: resumes,
    });
  } catch (error) {
    console.log(`Error in getResumeByUserId in resumeController :: ${error}`);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// updated resume

const updateResume = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        success: false,
        message: "Resume ID is required",
      });
    }
    const resume = await Resume.findOne({ _id: req.params.id });
    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }
    // console.log("Resume found:", req.body);
    // Merge updated fields with existing resume
    lodash.merge(resume, req.body);

    // Save the updated resume
    const savedResume = await resume.save();

    res.status(200).json({
      success: true,
      message: "Resume updated successfully",
      resume: savedResume,
    });
  } catch (error) {
    console.log(`Error in updateResume in resumeController :: ${error}`);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const deleteResume = async (req, res) => {
  try {
    const resumeId = req.params.id;
    const resume = await Resume.findOne({ _id: resumeId });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }
    // Delete the resume
    const deletedResume = await Resume.findOneAndDelete({ _id: resumeId });
    if (!deletedResume) {
      return res.status(400).json({
        success: false,
        message: "Error in deleting resume. Please try again later.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Resume deleted successfully",
    });
  } catch (error) {
    console.log(`Error in deleteResume in resumeController :: ${error}`);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  getResumeDetailsByResumeId,
  createResume,
  getResumeByUserId,
  updateResume,
  deleteResume,
};
