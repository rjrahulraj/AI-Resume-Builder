import Resume1 from "../assets/Resume1.png";
import Resume2 from "../assets/Resume2.png";
import Resume3 from "../assets/Resume3.png";

export const resumeTemplates = [
  {
    id: "01",
    thumbnailImg: Resume1,
    colorPaletteCode: "themeOne",
  },
  {
    id: "02",
    thumbnailImg: Resume2,
    colorPaletteCode: "themeTwo",
  },
  {
    id: "03",
    thumbnailImg: Resume3,
    colorPaletteCode: "themeThree",
  },
];

export const DUMMY_RESUME_DATA = {
  userId: "64e4fa85c246b12e4571e1b3",
  title: "Full Stack Developer Resume",
  thumbnailLink: "https://example.com/thumbnail.jpg",
  template: {
    theme: "Modern",
    colorPalette: ["#FF6B6B", "#4ECDC4", "#1A535C"],
  },
  profileInfo: {
    profilePreviewUrl: "https://example.com/profile.jpg",
    fullname: "Rahul Raj",
    designation: "Full Stack Developer",
    summary:
      "Passionate developer with 3+ years of experience in building scalable web applications using MERN stack. Enthusiastic about clean code, open-source, and continuous learning.",
  },
  contactInfo: {
    email: "rahul@example.com",
    phone: "+91-9876543210",
    location: "Bhopal, India",
    linkedin: "https://linkedin.com/in/rahulraj",
    github: "https://github.com/rahulraj",
    website: "https://rahulraj.dev",
  },
  workExperience: [
    {
      company: "Techversity Pvt. Ltd.",
      role: "Backend Developer Intern",
      startDate: new Date("2023-06-01"),
      endDate: new Date("2023-09-01"),
      description:
        "Worked on building scalable REST APIs and user authentication using Node.js and Express. Integrated MongoDB for data storage and ensured security and performance optimization.",
    },
    {
      company: "Reckline Sport",
      role: "Software Developer Intern",
      startDate: new Date("2024-02-01"),
      endDate: new Date("2024-05-01"),
      description:
        "Created real-time betting games backend with role-based access and live transaction updates using WebSockets and MongoDB.",
    },
  ],
  education: [
    {
      institution: "IIIT Bhopal",
      degree: "B.Tech in Computer Science",
      startDate: new Date("2021-08-01"),
      endDate: new Date("2025-06-01"),
      description:
        "Currently pursuing B.Tech in CSE. Active participant in coding contests and technical clubs.",
    },
  ],
  skills: [
    { name: "React.js", progress: 85 },
    { name: "Node.js", progress: 80 },
    { name: "MongoDB", progress: 75 },
    { name: "C++", progress: 90 },
  ],
  projects: [
    {
      title: "Delish Dish - Food Delivery App",
      description:
        "A full-stack food delivery platform with cart, order, admin panel, and payment gateway. Built using MERN stack.",
      github: "https://github.com/rahulraj/delish-dish",
      liveDemo: "https://delishdish.vercel.app/",
    },
    {
      title: "Snap-Chat Clone",
      description:
        "Real-time chat application with image sharing and group chat features using WebSockets.",
      github: "https://github.com/rahulraj/snap-chat-clone",
      liveDemo: "https://snapchat-clone.vercel.app/",
    },
  ],
  certifications: [
    {
      title: "Full Stack Web Development",
      issuer: "Coursera",
      year: "2023",
    },
    {
      title: "MongoDB Basics",
      issuer: "MongoDB University",
      year: "2024",
    },
  ],
  languages: [
    { name: "English", process: 95 },
    { name: "Hindi", process: 100 },
  ],
  interests: ["Basketball", "Open Source", "UI/UX Design"],
  createdAt: new Date("2024-06-01T10:00:00Z"),
  updatedAt: new Date("2024-07-30T16:00:00Z"),
};
