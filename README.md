# 🚀 AI Resume Builder

An AI-powered web application that helps you create professional, personalized, and ATS-optimized resumes within seconds. Choose from modern templates, get real-time AI suggestions, and instantly export resumes in high-quality PDF format.


## ✨ Features

- 🧠 **AI Integration** – Auto-generate job titles, summaries, bullet points, and skill suggestions tailored to specific roles and industries.
- 🎨 **Multiple Professional Templates** – Choose from various beautifully designed, ATS-compliant templates.
- ⚡ **Real-Time Preview** – See changes instantly while editing your resume.
- 📤 **Instant Export** – Download clean, formatted PDF versions of your resume.
- 💡 **Custom Sections** – Add education, experience, skills, certifications, languages, interests, and more.
- 🧩 **Responsive UI** – Fully optimized for desktop, tablet, and mobile devices.
- 🔐 **User Authentication** – Secure login and resume management system.

## 🖥️ Tech Stack

- **Frontend:** React.js, Tailwind CSS, HTML2PDF.js, Vite
- **Backend:** Node.js, Express.js, MongoDB
- **AI:** OpenAI API (for content suggestions)
- **Authentication:** JWT
- **Deployment:** Render 

## 📸 Screenshots

<img width="1346" height="633" alt="image" src="https://github.com/user-attachments/assets/99ff71df-be8e-48e6-aa9e-80d6faff5649" />
<img width="1342" height="499" alt="image" src="https://github.com/user-attachments/assets/51a0bf94-93e9-4a48-90d7-1b396448b54d" />
<img width="1338" height="633" alt="image" src="https://github.com/user-attachments/assets/8b747514-fd2e-4882-8c87-11706d9b8663" />
<img width="1366" height="630" alt="image" src="https://github.com/user-attachments/assets/8153b461-ee27-488b-8b6d-7b521ac24289" />
<img width="1354" height="628" alt="image" src="https://github.com/user-attachments/assets/863bfce1-309c-4b13-b098-b135d7e2181f" />




## 📦 Installation

### Clone the repository

```bash
git clone https://github.com/rjrahulraj/AI-Resume-Builder.git
cd AI-Resume-Builder

### Backened Setup
cd backend
npm install
npm start
cp .env.example .env # Add your environment variables
VITE_BACKENED_URL=http://localhost:5000
VITE_OPENAI_API_KEY=your_openai_key



### Frontened Setup
cd frontend
npm install
npm run dev
cp .env.example .env # Add your environment variables
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
OPENAI_API_KEY=your_openai_key



