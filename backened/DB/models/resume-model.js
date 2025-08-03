const mongoose = require("mongoose");
const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    thumbnailLink: {
      type: String,
    },
    template: {
      theme: String,
      colorPalette: [String],
    },
    profileInfo: {
      profilePreviewUrl: String,
      fullname: String,
      designation: String,
      summary: String,
    },
    contactInfo: {
      email: String,
      phone: String,
      location: String,
      linkedin: String,
      github: String,
      website: String,
    },
    workExperience: [
      {
        company: String,
        role: String,
        startDate: String,
        endDate: String,
        description: String,
      },
    ],
    education: [
      {
        institution: String,
        degree: String,
        startDate: String,
        endDate: String,
        description: String,
      },
    ],
    skills: [
      {
        name: String,
        progress: Number,
      },
    ],
    projects: [
      {
        title: String,
        description: String,
        github: String,
        liveDemo: String,
      },
    ],
    certifications: [
      {
        title: String,
        issuer: String,
        year: String,
      },
    ],
    languages: [
      {
        name: String,
        process: Number, // Assuming process is a number representing proficiency
      },
    ],
    interests: [String],
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  }
);

const Resume = mongoose.model("Resume", resumeSchema);
module.exports = Resume;
