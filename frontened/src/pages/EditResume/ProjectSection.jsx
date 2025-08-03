import React, { useState } from 'react';
import Modal from '../../components/Model';
import { Plus, Minus } from 'lucide-react';
import { toast } from "react-toastify";
import { generateSummaryForProject } from '../../utils/generateSummary';

function ProjectSection({ resumeData, setResumeData, handleChange, renderInput }) {
     const [isModalOpen, setIsModalOpen] = useState(false);
     const [isloading, setIsLoading] = useState(false);
     const [newProject, setNewProject] = useState({
          title: '',
          description: '',
          github: '',
          liveDemo: '',
     });

     const handleNewProjectChange = (field, value) => {
          setNewProject((prev) => ({ ...prev, [field]: value }));
     };

     const handleAddProject = () => {
          if (newProject.title.trim() === '' || newProject.github.trim() === '') return;

          setResumeData((prev) => ({
               ...prev,
               projects: [...prev.projects, newProject],
          }));

          setNewProject({
               title: '',
               description: '',
               github: '',
               liveDemo: '',
          });

          setIsModalOpen(false);
     };

     const handleDelete = (index) => {
          const updated = resumeData.projects.filter((_, i) => i !== index);
          setResumeData((prev) => ({ ...prev, projects: updated }));
     };

     const generateProjectDescription = async (idx, title) => {
          try {
               setIsLoading(true);
               if (idx < 0) {
                    return toast.error("Invalid index for project description generation");
               }
               const description = await generateSummaryForProject(title, setIsLoading);
               if (idx === resumeData.projects.length) {
                    setNewProject((prev) => ({
                         ...prev,
                         description,
                    }));
               } else {
                    setResumeData((prev) => {
                         const updatedProjects = [...prev.projects];
                         if (!updatedProjects[idx]) return prev;
                         updatedProjects[idx].description = description;
                         return { ...prev, projects: updatedProjects };
                    });
               }
          } catch (error) {
               console.error("Error generating project description:", error);
               toast.error("Failed to generate project description");
          }
          finally {
               setIsLoading(false);
          }
     };


     return (
          <div className="w-full px-4 sm:px-6 lg:px-8">
               <section className="mb-10">
                    <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                         <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Projects</h2>
                         <button
                              onClick={() => setIsModalOpen(true)}
                              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                         >
                              <Plus />
                              Add
                         </button>
                    </div>

                    {resumeData.projects.map((proj, idx) => (
                         <div key={idx} className="mb-6 border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white">
                              <div className="flex justify-between items-center px-4 py-2 bg-gray-50">
                                   <h3 className="text-lg font-semibold text-gray-700">Project {idx + 1}</h3>
                                   <button
                                        onClick={() => handleDelete(idx)}
                                        className="bg-red-100 text-red-600 text-sm px-3 py-1.5 rounded hover:bg-red-200 transition flex justify-center items-center"
                                   >

                                        - Remove
                                   </button>
                              </div>
                              <div className="p-4 rounded space-y-4">
                                   {renderInput('Title', proj.title, (val) =>
                                        handleChange('projects', 'title', val, idx)
                                   )}
                                   {renderInput('GitHub', proj.github, (val) =>
                                        handleChange('projects', 'github', val, idx)
                                   )}
                                   {renderInput('Live Demo', proj.liveDemo, (val) =>
                                        handleChange('projects', 'liveDemo', val, idx)
                                   )}
                                   <div>
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 border-b pb-2">
                                             <div className="flex items-center gap-1">
                                                  <label className="text-sm font-medium text-gray-700">
                                                       Description <span className="text-red-500 font-bold">*</span>
                                                  </label>
                                             </div>

                                             <button
                                                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-1.5 rounded-md transition-all duration-200 disabled:opacity-50"
                                                  onClick={() => generateProjectDescription(idx, proj.title)}
                                             >
                                                  ✦ {isloading ? "Generating..." : "Generate with AI"} ✦
                                             </button>
                                        </div>
                                        <textarea
                                             value={proj.description}
                                             onChange={(e) =>
                                                  handleChange('projects', 'description', e.target.value, idx)
                                             }
                                             className="w-full border rounded-md px-3 py-2 text-sm"
                                             rows="3"
                                        />
                                   </div>
                              </div>
                         </div>
                    ))}
               </section>

               {/* Modal for Adding New Project */}
               <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <div className="p-4">
                         <h2 className="text-xl font-bold mb-4">Add New Project</h2>
                         <div className="space-y-4">
                              {renderInput('Title', newProject.title, (val) => handleNewProjectChange('title', val))}
                              {renderInput('GitHub', newProject.github, (val) => handleNewProjectChange('github', val))}
                              {renderInput('Live Demo', newProject.liveDemo, (val) => handleNewProjectChange('liveDemo', val))}
                              <div>
                                   <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 border-b pb-2">
                                        <div className="flex items-center gap-1">
                                             <label className="text-sm font-medium text-gray-700">
                                                  Description <span className="text-red-500 font-bold">*</span>
                                             </label>
                                        </div>

                                        <button
                                             className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-1.5 rounded-md transition-all duration-200 disabled:opacity-50"
                                             onClick={() => generateProjectDescription(resumeData.projects.length, newProject.title)}
                                        >
                                             ✦ {isloading ? "Generating..." : "Generate with AI"} ✦
                                        </button>
                                   </div>
                                   <textarea
                                        value={newProject.description}
                                        onChange={(e) => handleNewProjectChange('description', e.target.value)}
                                        className="w-full border border-black rounded-md px-3 py-2 text-sm"
                                        rows="3"
                                   />
                              </div>
                              <div className="flex justify-end gap-3 pt-4">
                                   <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
                                   >
                                        Cancel
                                   </button>
                                   <button
                                        onClick={handleAddProject}
                                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                                   >
                                        Save
                                   </button>
                              </div>
                         </div>
                    </div>
               </Modal>
          </div>
     );
}

export default ProjectSection;
