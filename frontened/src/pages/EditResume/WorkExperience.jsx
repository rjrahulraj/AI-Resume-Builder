import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import Modal from "../../components/Model";
import { toast } from "react-toastify";
import { generateSummaryforjob } from "../../utils/generateSummary";

function WorkExperience({ resumeData, setResumeData, handleChange, renderInput }) {
     const [isModalOpen, setIsModalOpen] = useState(false);
     const [isloading, setIsLoading] = useState(false);

     const [newWE, setNewWE] = useState({
          company: "",
          role: "",
          location: "",
          startDate: "",
          endDate: "",
          description: "",
     });

     const handleNewWEChange = (field, value) => {
          setNewWE((prev) => ({ ...prev, [field]: value }));
     };

     const handleAddWorkExperience = () => {
          if (newWE.company.trim() === "" || newWE.role.trim() === "") return;

          setResumeData((prev) => ({
               ...prev,
               workExperience: [...prev.workExperience, newWE],
          }));

          setNewWE({
               company: "",
               role: "",
               location: "",
               startDate: "",
               endDate: "",
               description: "",
          });

          setIsModalOpen(false);
     };

     const handleDelete = (index) => {
          const updated = resumeData.workExperience.filter((_, i) => i !== index);
          setResumeData((prev) => ({ ...prev, workExperience: updated }));
     };

     const generateJobDescription = async (idx, role, company, startDate, endDate) => {
          try {
               if (idx < 0) {
                    return toast.error("Invalid index for job description generation");
               }
               const description = await generateSummaryforjob(role, company, startDate, endDate, setIsLoading);
               if (idx === resumeData.workExperience.length) {
                    setNewWE((prev) => ({
                         ...prev,
                         description,
                    }));
               } else {
                    // Handle already added work experience
                    setResumeData((prev) => {
                         const updatedWorkExperience = [...prev.workExperience];
                         if (!updatedWorkExperience[idx]) return prev; // safeguard
                         updatedWorkExperience[idx].description = description;
                         return { ...prev, workExperience: updatedWorkExperience };
                    });
               }
          } catch (error) {
               console.error("Error generating job description:", error);
               toast.error("Failed to generate job description");

          }
     }

     return (
          <div className="w-full px-4 sm:px-6 lg:px-8">
               <section className="mb-10">
                    <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                         <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Work Experience</h2>
                         <button
                              onClick={() => setIsModalOpen(true)}
                              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                         >
                              <Plus className="w-4 h-4" />
                              Add Experience
                         </button>
                    </div>

                    {resumeData.workExperience.map((job, idx) => (
                         <div key={idx} className="mb-8 border border-gray-200 rounded-lg shadow-sm bg-white transition hover:shadow-md">
                              <div className="flex justify-between items-center px-4 py-3 bg-gray-100 border-b border-gray-200">
                                   <h3 className="text-lg sm:text-xl font-semibold text-gray-700">
                                        {job.role} at {job.company}
                                   </h3>
                                   <button
                                        onClick={() => handleDelete(idx)}
                                        className="flex items-center gap-1 bg-red-100 text-red-600 text-sm px-3 py-1.5 rounded hover:bg-red-200 transition"
                                   >
                                        <Minus className="w-4 h-4" />
                                        Remove
                                   </button>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-4 py-4">
                                   {renderInput("Role", job.role, (val) =>
                                        handleChange("workExperience", "role", val, idx)
                                   )}
                                   {renderInput("Company", job.company, (val) =>
                                        handleChange("workExperience", "company", val, idx)
                                   )}
                                   {renderInput("Location", job.location, (val) =>
                                        handleChange("workExperience", "location", val, idx)
                                   )}
                                   {renderInput("Start Date", job.startDate, (val) =>
                                        handleChange("workExperience", "startDate", val, idx)
                                   )}
                                   {renderInput("End Date", job.endDate, (val) =>
                                        handleChange("workExperience", "endDate", val, idx)
                                   )}
                                   <div className="col-span-1 sm:col-span-2">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 border-b pb-2">
                                             <div className="flex items-center gap-1">
                                                  <label className="text-sm font-medium text-gray-700">
                                                       Description <span className="text-red-500 font-bold">*</span>
                                                  </label>
                                             </div>

                                             <button
                                                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-1.5 rounded-md transition-all duration-200 disabled:opacity-50"
                                                  onClick={() => generateJobDescription(idx, job.role, job.company, job.startDate, job.endDate)}
                                                  disabled={isloading}
                                             >
                                                  ✦ {isloading ? "Generating..." : "Generate with AI"} ✦
                                             </button>
                                        </div>
                                        <textarea
                                             value={job.description}
                                             onChange={(e) =>
                                                  handleChange("workExperience", "description", e.target.value, idx)
                                             }
                                             className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                             rows="4"
                                             placeholder="Describe your role, responsibilities, achievements..."
                                        />
                                   </div>
                              </div>
                         </div>
                    ))}
               </section>

               {/* Modal Form for New Work Experience */}
               <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <div className="p-4 sm:p-6 max-w-2xl mx-auto">
                         <h2 className="text-xl font-semibold text-gray-800 mb-4">Add Work Experience</h2>
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {renderInput("Role", newWE.role, (val) => handleNewWEChange("role", val))}
                              {renderInput("Company", newWE.company, (val) => handleNewWEChange("company", val))}
                              {renderInput("Location", newWE.location, (val) => handleNewWEChange("location", val))}
                              {renderInput("Start Date", newWE.startDate, (val) => handleNewWEChange("startDate", val, "text",))}
                              {renderInput("End Date", newWE.endDate, (val) => handleNewWEChange("endDate", val, "text"))}
                         </div>
                         <div className="mt-4">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 border-b pb-2">
                                   <div className="flex items-center gap-1">
                                        <label className="text-sm font-medium text-gray-700">
                                             Description <span className="text-red-500 font-bold">*</span>
                                        </label>
                                   </div>

                                   <button
                                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-1.5 rounded-md flex items-center gap-2 transition-all duration-200 disabled:opacity-50"
                                        onClick={() =>
                                             generateJobDescription(
                                                  resumeData.workExperience.length,
                                                  newWE.role,
                                                  newWE.company,
                                                  newWE.startDate,
                                                  newWE.endDate
                                             )
                                        }
                                   >
                                        ✦
                                        {isloading ? (
                                             "Generating..."
                                        ) : (
                                             <>
                                                  Generate with AI
                                                  <img
                                                       src="/miro_explore_ai_sparkles_icon.png"
                                                       alt="AI Sparkle"
                                                       className="w-5 h-5"
                                                  />
                                             </>
                                        )}
                                        ✦
                                   </button>

                              </div>
                              <textarea
                                   value={newWE.description}
                                   onChange={(e) => handleNewWEChange("description", e.target.value)}
                                   className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                   rows="4"
                                   placeholder="Explain your responsibilities or impact..."
                              />
                         </div>
                         <div className="flex justify-end gap-3 mt-6">
                              <button
                                   onClick={() => setIsModalOpen(false)}
                                   className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition"
                              >
                                   Cancel
                              </button>
                              <button
                                   onClick={handleAddWorkExperience}
                                   className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                              >
                                   Add
                              </button>
                         </div>
                    </div>
               </Modal>
          </div>
     );
}

export default WorkExperience;
