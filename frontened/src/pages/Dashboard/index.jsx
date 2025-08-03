import { useEffect, useState } from 'react';
import { RiFileAddLine } from "react-icons/ri";
import Modal from '../../components/Model';
import { useUserContext } from "../../context/UserContextProvider";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from 'react-router-dom';
import { ResumeSummaryCard } from './ResumeSummaryCard';
import moment from 'moment';
import CreateResumeForm from './CreateResumeForm';
import Modal2 from '../../components/Modal2';

const BACKEND_URL = import.meta.env.VITE_BACKENED_URL;


function Dashboard() {
     const [allResumes, setAllResumes] = useState([]);
     const [isModalOpen, setIsModalOpen] = useState(false);
     const navigate = useNavigate();

     const { user, setLoading } = useUserContext();

     const isAuthenticated = localStorage.getItem('token');

     if (!isAuthenticated) {
          return <Navigate to="/" replace />;
     }

     const calculateCompletion = (resume) => {
          let completedFields = 0;
          let totalFields = 0;

          // Profile Info
          totalFields += 3;
          if (resume.profileInfo?.fullName) completedFields++;
          if (resume.profileInfo?.designation) completedFields++;
          if (resume.profileInfo?.summary) completedFields++;

          // Contact Info
          totalFields += 2;
          if (resume.contactInfo?.email) completedFields++;
          if (resume.contactInfo?.phone) completedFields++;

          // Work Experience
          resume.workExperience?.forEach(exp => {
               totalFields += 5;
               if (exp.company) completedFields++;
               if (exp.role) completedFields++;
               if (exp.startDate) completedFields++;
               if (exp.endDate) completedFields++;
               if (exp.description) completedFields++;
          });

          // Education
          resume.education?.forEach(edu => {
               totalFields += 4;
               if (edu.degree) completedFields++;
               if (edu.institution) completedFields++;
               if (edu.startDate) completedFields++;
               if (edu.endDate) completedFields++;
          });

          // Skills
          resume.skills?.forEach(skill => {
               totalFields += 2;
               if (skill.name) completedFields++;
               if (skill.progress > 0) completedFields++;
          });

          // Projects
          resume.projects?.forEach(project => {
               totalFields += 4;
               if (project.title) completedFields++;
               if (project.description) completedFields++;
               if (project.github) completedFields++;
               if (project.liveDemo) completedFields++;
          });

          // Certifications
          resume.certifications?.forEach(cert => {
               totalFields += 3;
               if (cert.title) completedFields++;
               if (cert.issuer) completedFields++;
               if (cert.year) completedFields++;
          });

          // Languages
          resume.languages?.forEach(lang => {
               totalFields += 2;
               if (lang.name) completedFields++;
               if (lang.progress > 0) completedFields++;
          });

          // Interests
          totalFields += (resume.interests?.length || 0);
          completedFields += (resume.interests?.filter(i => i?.trim() !== "")?.length || 0);

          return Math.round((completedFields / totalFields) * 100);
     };

     const getAllResumes = async () => {
          try {
               setLoading(true);
               const response = await fetch(`${BACKEND_URL}/api/resume`, {
                    method: "GET",
                    headers: {
                         "Content-Type": "application/json",
                         Authorization: JSON.parse(localStorage.getItem("token")),
                    },
               });

               const data = await response.json();
               // console.log("All Resumes Data:", data);
               if (!data.success) {
                    toast.error(data.message || "Failed to fetch resumes");
                    return;
               }
               else {
                    setAllResumes(data.resumes);
               }
          } catch (error) {
               console.error(`Error fetching resumes: ${error}`);
               toast.error(`Error fetching resumes: ${error}`);
          } finally {
               setLoading(false);
          }
     }

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
                    setAllResumes(allResumes.filter(resume => resume._id !== resumeId));
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

     useEffect(() => {
          getAllResumes();
     }, [user])

     return (
          <div className="pt-28 px-4 sm:px-6 lg:px-8">

               {/* Header Section */}
               <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <div>
                         <h2 className="text-3xl font-bold text-gray-800">My Resumes</h2>
                         <p className="text-sm text-gray-600">Start building your professional resume</p>
                    </div>
                    <button
                         onClick={() => setIsModalOpen(true)}
                         className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl shadow-md hover:scale-105 transition"
                    >
                         Create Now <RiFileAddLine size={20} />
                    </button>
               </div>

               {/* No Resume UI */}
               {allResumes.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg text-gray-600 text-center px-4">
                         <RiFileAddLine size={32} className="mb-2 text-blue-500" />
                         <h3 className="text-xl font-semibold mb-1">No Resume Yet</h3>
                         <p className="text-sm max-w-xs mb-4">
                              You haven't created any resumes yet. Start building your professional resume to land your dream job.
                         </p>
                         <button
                              onClick={() => setIsModalOpen(true)}
                              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg flex items-center gap-2 hover:scale-105 transition"
                         >
                              Create Your First Resume
                              <RiFileAddLine size={18} />
                         </button>
                    </div>
               )}
               <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-6'>
                    {
                         allResumes.map((resume) => {
                              const completion = calculateCompletion(resume);
                              return (
                                   <ResumeSummaryCard
                                        key={resume._id}
                                        imgUrl={resume.thumbnailLink}
                                        title={resume.title || "Untitled Resume"}
                                        createdAt={resume.createdAt}
                                        updatedAt={resume.updatedAt}
                                        onSelect={() => navigate(`/resume/${resume._id}`)}
                                        onDelete={() => handleDeleteResume(resume._id)}
                                        completion={completion}
                                        isPremium={resume.isPremium}
                                        isNew={moment(resume.createdAt).isAfter(moment().subtract(7, 'days'))}
                                   />
                              );
                         })
                    }

               </div>


               {/* Modal */}
               <Modal2 isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>

                    <CreateResumeForm></CreateResumeForm>
               </Modal2>
          </div>
     );
}

export default Dashboard;
