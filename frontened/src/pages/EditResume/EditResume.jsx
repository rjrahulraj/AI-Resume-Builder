
import { useEffect, useState } from "react";
import TitleInput from "./TitleInput";
import { Download, Palette, Trash2 } from "lucide-react";
import EducationSection from "./EducationSection";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import WorkExperience from "./WorkExperience";
import ProjectSection from "./ProjectSection";
import SkillsSection from "./SkillsSection";
import ProfileSection from "./ProfileSection";
import ContactSection from "./ContactSection";
import InterestSections from "./InterestSections";
import CertificateSection from "./CertificateSection";
import { useUserContext } from '../../context/UserContextProvider';
import Modal2 from "../../components/Modal2";
import LanguageSection from "./LanguageSection";
import ResumePreview from "./ResumePreview";
import { useRef } from "react";
const BACKEND_URL = import.meta.env.VITE_BACKENED_URL;
import TemplateOne from "./Template/TemplateOne";
import TemplateTwo from "./Template/TemplateTwo";
import html2pdf from "html2pdf.js";


const EditResume = () => {
     const [resumeData, setResumeData] = useState({
          title: "Professional Resume",
          thumbnailLink: "",
          profileInfo: {
               fullName: "",
               designation: "",
               summary: "",
          },
          template: {
               theme: "modern",
               colorPalette: []
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
                    progress: 0,
               },
          ],
          interests: [""],
     })
     const { resumeId } = useParams();
     const navigate = useNavigate();
     const { setLoading } = useUserContext();
     const isAuthenticated = localStorage.getItem('token');
     const [isModalOpen, setIsModalOpen] = useState(false);
     const previewRef = useRef();

     if (!isAuthenticated) {
          return <Navigate to="/" replace />;
     }



     const handleDownload = () => {
          const resume = document.getElementById("resume-preview");

          // Add class to temporarily remove scroll
          document.body.classList.add("export-pdf");

          const opt = {
               margin: 0,
               filename: "resume.pdf",
               html2canvas: { scale: 2 },
               jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
          };

          html2pdf()
               .set(opt)
               .from(resume)
               .save()
               .then(() => {
                    // Remove class after download
                    document.body.classList.remove("export-pdf");
               });
     };


     const handleDownloadPDF = () => {
          const original = document.getElementById("resume-preview");
          if (!original) return;

          const clone = original.cloneNode(true);
          clone.style.maxHeight = "none";
          clone.style.overflow = "visible";
          clone.style.width = "794px"; // A4 width in px at 96 DPI
          clone.style.backgroundColor = "#ffffff"; // Ensure white background
          clone.style.color = "#111827"; // Tailwind text-gray-800
          clone.style.fontFamily = "sans-serif";
          clone.classList.remove("custom-scrollbar"); // Remove scroll styling for export

          // Optional: Remove rounded corners and shadows if any
          clone.style.boxShadow = "none";
          clone.style.borderRadius = "0";

          // Create off-screen container
          const container = document.createElement("div");
          container.style.position = "fixed";
          container.style.top = "-10000px";
          container.style.left = "-10000px";
          container.style.width = "794px";
          container.style.padding = "24px";
          container.style.background = "#ffffff"; // White background for page
          container.style.zIndex = "-9999";
          container.appendChild(clone);
          document.body.appendChild(container);

          const opt = {
               margin: 0,
               filename: "resume.pdf",
               image: { type: "jpeg", quality: 0.98 },
               html2canvas: {
                    scale: 2,
                    useCORS: true,
                    allowTaint: true,
                    backgroundColor: "#ffffff",
                    windowWidth: clone.scrollWidth,
                    windowHeight: clone.scrollHeight,
               },
               jsPDF: {
                    unit: "pt",
                    format: "a4",
                    orientation: "portrait",
               },
          };

          html2pdf()
               .set(opt)
               .from(clone)
               .save()
               .then(() => {
                    document.body.removeChild(container);
               });
     };




     const handleDeleteResume = async (resumeId) => {

          if (resumeId === undefined || resumeId === null) {
               toast.error("Invalid resume ID");
               return;
          }
          try {
               setLoading(true);
               const response = await fetch(`${BACKEND_URL}/api/resume/${resumeId}`, {
                    method: "DELETE",
                    headers: {
                         "Content-Type": "application/json",
                         Authorization: JSON.parse(localStorage.getItem("token")),
                    },
               });
               const data = await response.json();
               if (!data.success) {
                    toast.error(data.message || "Failed to delete resume");
                    return;
               }
               else {
                    toast.success("Resume deleted successfully");
                    navigate("/dashboard");
               }
          }
          catch (error) {
               console.error(`Error deleting resume: ${error}`);
               toast.error(`Error deleting resume: ${error}`);
          }
          finally {
               setLoading(false);
          }
     }
     const handleChange = (section, key, value, index = null) => {
          setResumeData((prev) => {
               const updated = { ...prev };
               if (index !== null) {
                    updated[section][index][key] = value;
               } else {
                    updated[section][key] = value;
               }
               return updated;
          });
     };

     const renderInput = (label, value, onChange, type = "text", placeholder = "") => (
          <div className="mb-4 w-full">
               <label className="block font-medium text-sm text-gray-700 mb-1">{label}</label>
               <input
                    type={type}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="w-full border-black border rounded-md px-3 py-2 text-sm"
               />
          </div>
     );


     const fetchResumeDetailsById = async () => {
          try {
               setLoading(true);
               let response = await fetch(`${BACKEND_URL}/api/resume/${resumeId}`, {
                    method: "GET",
                    headers: {
                         "Content-Type": "application/json",
                         Authorization: JSON.parse(localStorage.getItem("token")),
                    },
               });

               response = await response.json();

               if (response.data && response.data.profileInfo) {
                    const resumeInfo = response.data

                    setResumeData((prevState) => ({
                         ...prevState,
                         title: resumeInfo?.title || "Untitled",
                         template: resumeInfo?.template || prevState?.template,
                         profileInfo: resumeInfo?.profileInfo || prevState?.profileInfo,
                         contactInfo: resumeInfo?.contactInfo || prevState?.contactInfo,
                         workExperience: resumeInfo?.workExperience || prevState?.workExperience,
                         education: resumeInfo?.education || prevState?.education,
                         skills: resumeInfo?.skills || prevState?.skills,
                         projects: resumeInfo?.projects || prevState?.projects,
                         certifications: resumeInfo?.certifications || prevState?.certifications,
                         languages: resumeInfo?.languages || prevState?.languages,
                         interests: resumeInfo?.interests || prevState?.interests,
                    }))
               }
          } catch (error) {
               console.error("Error fetching resume:", error)
               toast.error("Failed to load resume data")
          }
          finally {
               setLoading(false);
          }
     }

     const handleSaveChanges = async () => {
          try {
               setLoading(true);
               const response = await fetch(`${BACKEND_URL}/api/resume/${resumeId}`, {
                    method: "PUT",
                    headers: {
                         "Content-Type": "application/json",
                         Authorization: JSON.parse(localStorage.getItem("token")),
                    },
                    body: JSON.stringify(resumeData),
               });

               if (response.ok) {
                    toast.success("Resume updated successfully");
                    navigate(`/resume/${resumeId}`);
               } else {
                    throw new Error("Failed to update resume");
               }
          } catch (error) {
               console.error("Error saving resume:", error);
               toast.error("Failed to save resume changes");
          }
          finally {
               setLoading(false);
          }
     }



     useEffect(() => {
          if (resumeId) {
               fetchResumeDetailsById()
          }
     }, [resumeId])

     return (
          <div className="flex flex-col lg:flex-row mt-24 p-4 gap-8 max-w-screen-2xl mx-auto">
               {/* Left: Editor Section */}
               <div className="w-full lg:w-1/2 flex flex-col space-y-10">
                    {/* Header */}
                    <div className="w-full p-4 sm:p-6 bg-white rounded-xl shadow-lg flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                         {/* Title Input */}
                         <div className="w-full lg:flex-1">
                              <TitleInput
                                   title={resumeData.title}
                                   setTitle={(value) => setResumeData((prev) => ({ ...prev, title: value }))}
                              />
                         </div>

                         {/* Action Buttons */}
                         <div className="flex flex-wrap justify-start lg:justify-end gap-3 w-full lg:w-auto">

                              <div
                                   onClick={() => handleDeleteResume(resumeId)}
                                   className="flex items-center gap-2 bg-red-600 rounded-lg px-4 py-2 text-white hover:bg-red-800 transition text-sm shadow-sm"
                              >
                                   <Trash2 size={16} />
                                   <span>Delete</span>
                              </div>
                              {/* <DownloadPDFButton resumeData={resumeData}></DownloadPDFButton> */}

                              <button
                                   onClick={() => setIsModalOpen(true)}
                                   className="flex items-center gap-2 bg-green-600 rounded-lg px-4 py-2 text-white hover:bg-green-800 transition text-sm shadow-sm"
                              >
                                   <Download size={16} />
                                   <span>Download</span>
                              </button>
                         </div>
                    </div>

                    {/* Resume Sections */}
                    <ProfileSection resumeData={resumeData} setResumeData={setResumeData} handleChange={handleChange} renderInput={renderInput} />
                    <ContactSection resumeData={resumeData} setResumeData={setResumeData} handleChange={handleChange} renderInput={renderInput} />
                    <EducationSection resumeData={resumeData} setResumeData={setResumeData} handleChange={handleChange} renderInput={renderInput} />
                    <WorkExperience resumeData={resumeData} setResumeData={setResumeData} handleChange={handleChange} renderInput={renderInput} />
                    <ProjectSection resumeData={resumeData} setResumeData={setResumeData} handleChange={handleChange} renderInput={renderInput} />
                    <SkillsSection resumeData={resumeData} setResumeData={setResumeData} handleChange={handleChange} renderInput={renderInput} />
                    <LanguageSection resumeData={resumeData} setResumeData={setResumeData} handleChange={handleChange} renderInput={renderInput} />
                    <CertificateSection resumeData={resumeData} setResumeData={setResumeData} handleChange={handleChange} renderInput={renderInput} />
                    <InterestSections resumeData={resumeData} setResumeData={setResumeData} handleChange={handleChange} renderInput={renderInput} />

                    {/* Save Button */}
                    <button
                         onClick={() => handleSaveChanges()}
                         className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full sm:w-auto"
                    >
                         Save Changes
                    </button>
               </div>

               {/* Right: Preview Section */}

               <div ref={previewRef} className="w-full lg:w-1/2 sticky top-28 h-fit">
                    <ResumePreview resumeData={resumeData} />
                    {/* <TemplateOne resumeData={resumeData}></TemplateOne> */}

               </div>

               <div>
                    <Modal2 isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>

                         <div className="flex gap-2 flex-col justify-center">
                              <h2 className="text-xl">Would you like to download your resume?</h2>

                              <div className="flex gap-2 justify-end">

                                   {/* <DownloadPDFButton resumeData={resumeData}></DownloadPDFButton> */}
                                   <button className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-800 transition" onClick={handleDownload}>Download PDF</button>
                              </div>
                         </div>


                    </Modal2>
               </div>


          </div>
     );

};

export default EditResume;
