import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import Modal from "../../components/Model";
import { toast } from "react-toastify";
import { generateSummaryForEducation } from "../../utils/generateSummary";

function EducationSection({ resumeData, setResumeData, handleChange, renderInput }) {
     const [isModalOpen, setIsModalOpen] = useState(false);
     const [isloading, setIsLoading] = useState(false);

     const [newEdu, setNewEdu] = useState({
          institution: "",
          degree: "",
          startDate: "",
          endDate: "",
          description: "",
     });

     const handleNewEduChange = (field, value) => {
          setNewEdu((prev) => ({ ...prev, [field]: value }));
     };

     const handleAddEducation = () => {
          if (newEdu.institution.trim() === "") return;
          setResumeData((prev) => ({
               ...prev,
               education: [...prev.education, newEdu],
          }));
          setNewEdu({
               institution: "",
               degree: "",
               startDate: "",
               endDate: "",
               description: "",
          });
          setIsModalOpen(false);
     };

     const handleDelete = (index) => {
          const updated = resumeData.education.filter((_, i) => i !== index);
          setResumeData((prev) => ({ ...prev, education: updated }));
     };

     const generateEducationSummary = async (idx, degree, institution, startDate, endDate) => {
          try {
               setIsLoading(true);
               if (idx < 0) {
                    return toast.error("Invalid index for education summary generation");
               }

               const description = await generateSummaryForEducation(degree, institution, startDate, endDate, setIsLoading);

               if (idx === resumeData.education.length) {
                    setNewEdu((prev) => ({
                         ...prev,
                         description,
                    }));
               } else {
                    setResumeData((prev) => {
                         const updatedEdu = [...prev.education];
                         if (!updatedEdu[idx]) return prev;
                         updatedEdu[idx].description = description;
                         return { ...prev, education: updatedEdu };
                    });
               }
          } catch (error) {
               console.error("Error generating education summary:", error);
               toast.error("Failed to generate education summary");
          }
          finally {
               setIsLoading(false);
          }
     };


     return (
          <div className="w-full px-4 sm:px-6 lg:px-8">
               <section className="mb-10">
                    <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                         <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Education</h2>
                         <button
                              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                              onClick={() => setIsModalOpen(true)}
                         >
                              <Plus className="w-4 h-4" />
                              Add Education
                         </button>
                    </div>

                    {resumeData.education.map((edu, idx) => (
                         <div
                              key={idx}
                              className="bg-white shadow-sm border border-gray-200 rounded-lg mb-8 transition hover:shadow-md"
                         >
                              <div className="flex flex-wrap justify-between items-center px-4 py-3 bg-gray-100 border-b border-gray-200">
                                   <h3 className="text-lg sm:text-xl font-semibold text-gray-700">
                                        {edu.degree} at {edu.institution}
                                   </h3>
                                   <button
                                        onClick={() => handleDelete(idx)}
                                        className="flex items-center gap-1 text-sm text-red-600 bg-red-100 px-3 py-1.5 rounded hover:bg-red-200 transition"
                                   >
                                        <Minus className="w-4 h-4" />
                                        Remove
                                   </button>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-4 py-4">
                                   {renderInput("Institution", edu.institution, (val) =>
                                        handleChange("education", "institution", val, idx)
                                   )}
                                   {renderInput("Degree", edu.degree, (val) =>
                                        handleChange("education", "degree", val, idx)
                                   )}
                                   {renderInput("Start Date", edu.startDate, (val) =>
                                        handleChange("education", "startDate", val, idx)
                                   )}
                                   {renderInput("End Date", edu.endDate, (val) =>
                                        handleChange("education", "endDate", val, idx)
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
                                                  onClick={() => generateEducationSummary(idx, edu.degree, edu.institution, edu.startDate, edu.endDate)}

                                             >
                                                  ✦   {isloading ? "Generating..." : "Generate with AI"} ✦
                                             </button>
                                        </div>
                                        <textarea
                                             className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                             value={edu.description}
                                             onChange={(e) =>
                                                  handleChange("education", "description", e.target.value, idx)
                                             }
                                             rows="3"
                                             placeholder="Describe your coursework, achievements, or projects"
                                        />
                                   </div>
                              </div>
                         </div>
                    ))}
               </section>

               {/* Modal */}
               <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <div className="p-4 sm:p-6">
                         <h3 className="text-xl font-semibold text-gray-800 mb-4">Add Education</h3>
                         <div className="grid grid-cols-1 gap-4">
                              <input
                                   type="text"
                                   placeholder="Institution"
                                   className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                   value={newEdu.institution}
                                   onChange={(e) => handleNewEduChange("institution", e.target.value)}
                              />
                              <input
                                   type="text"
                                   placeholder="Degree"
                                   className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                   value={newEdu.degree}
                                   onChange={(e) => handleNewEduChange("degree", e.target.value)}
                              />
                              <input
                                   type="text"
                                   placeholder="Start Date"
                                   className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                   value={newEdu.startDate}
                                   onChange={(e) => handleNewEduChange("startDate", e.target.value)}
                              />
                              <input
                                   type="text"
                                   placeholder="End Date"
                                   className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                   value={newEdu.endDate}
                                   onChange={(e) => handleNewEduChange("endDate", e.target.value)}
                              />
                              <textarea
                                   placeholder="Description"
                                   className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                   rows="3"
                                   value={newEdu.description}
                                   onChange={(e) => handleNewEduChange("description", e.target.value)}
                              />
                              <button
                                   onClick={handleAddEducation}
                                   className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                              >
                                   Add Education
                              </button>
                         </div>
                    </div>
               </Modal>
          </div>
     );
}

export default EducationSection;
