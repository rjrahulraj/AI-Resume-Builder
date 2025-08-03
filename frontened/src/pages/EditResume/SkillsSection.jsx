import React from 'react';
import { Plus, Minus } from 'lucide-react';

function SkillsSection({ resumeData, setResumeData }) {
     const handleSkillChange = (index, field, value) => {
          const updatedSkills = [...resumeData.skills];
          updatedSkills[index][field] = field === 'progress' ? Number(value) : value;
          setResumeData({ ...resumeData, skills: updatedSkills });
     };

     const handleAddSkill = () => {
          setResumeData((prev) => ({
               ...prev,
               skills: [...prev.skills, { name: '', progress: 0 }],
          }));
     };

     const handleRemoveSkill = (index) => {
          const updatedSkills = resumeData.skills.filter((_, i) => i !== index);
          setResumeData((prev) => ({ ...prev, skills: updatedSkills }));
     };

     return (
          <div className="w-full px-4 sm:px-6 lg:px-8">
               <section className="mb-10">
                    <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                         <h2 className="text-2xl font-bold text-gray-800">Skills</h2>
                         <button
                              onClick={handleAddSkill}
                              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition text-sm"
                         >
                              <Plus className="w-4 h-4" />
                              Add Skill
                         </button>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                         {resumeData.skills.map((skill, index) => (
                              <div
                                   key={index}
                                   className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm flex flex-col gap-3"
                              >
                                   <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
                                        <div className="w-full sm:w-1/2">
                                             <label className="block text-xs font-medium text-gray-700 mb-1">
                                                  Skill Name
                                             </label>
                                             <input
                                                  type="text"
                                                  value={skill.name}
                                                  onChange={(e) => handleSkillChange(index, 'name', e.target.value)}
                                                  className="w-full border border-gray-300 px-2 py-1.5 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                  placeholder="e.g. React.js"
                                             />
                                        </div>

                                        <div className="w-full sm:w-1/2 mt-2 sm:mt-0">
                                             <label className="block text-xs font-medium text-gray-700 mb-1">
                                                  Proficiency (%)
                                             </label>
                                             <input
                                                  type="number"
                                                  min="0"
                                                  max="100"
                                                  value={skill.progress}
                                                  onChange={(e) => handleSkillChange(index, 'progress', e.target.value)}
                                                  className="w-full border border-gray-300 px-2 py-1.5 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                  placeholder="e.g. 80"
                                             />
                                        </div>
                                   </div>

                                   <div className="flex justify-end">
                                        <button
                                             onClick={() => handleRemoveSkill(index)}
                                             className="text-red-600 text-sm hover:underline flex items-center gap-1 bg-red-100 p-1 rounded"
                                        >
                                             <Minus className="w-4 h-4" />
                                             Remove
                                        </button>
                                   </div>
                              </div>
                         ))}
                    </div>

               </section>
          </div>
     );
}

export default SkillsSection;
