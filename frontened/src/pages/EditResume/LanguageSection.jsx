
import { Plus, Minus } from 'lucide-react';

function LanguageSection({ resumeData, setResumeData }) {
     const handleLanguageChange = (index, field, value) => {
          const updatedLanguages = [...resumeData.languages];
          updatedLanguages[index][field] = field === 'progress' ? Number(value) : value;
          setResumeData({ ...resumeData, languages: updatedLanguages });
     };

     const handleAddLanguage = () => {
          setResumeData((prev) => ({
               ...prev,
               languages: [...(prev.languages || []), { name: '', progress: 0 }],
          }));
     };

     const handleRemoveLanguage = (index) => {
          const updatedLanguages = resumeData.languages.filter((_, i) => i !== index);
          setResumeData((prev) => ({ ...prev, languages: updatedLanguages }));
     };

     return (
          <div className="w-full px-4 sm:px-6 lg:px-8">
               <section className="mb-10">
                    <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                         <h2 className="text-2xl font-bold text-gray-800">Languages</h2>
                         <button
                              onClick={handleAddLanguage}
                              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition text-sm"
                         >
                              <Plus className="w-4 h-4" />
                              Add Language
                         </button>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                         {(resumeData.languages || []).map((language, index) => (
                              <div
                                   key={index}
                                   className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm flex flex-col gap-3"
                              >
                                   <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
                                        <div className="w-full sm:w-1/2">
                                             <label className="block text-xs font-medium text-gray-700 mb-1">
                                                  Language Name
                                             </label>
                                             <input
                                                  type="text"
                                                  value={language.name}
                                                  onChange={(e) =>
                                                       handleLanguageChange(index, 'name', e.target.value)
                                                  }
                                                  className="w-full border border-gray-300 px-2 py-1.5 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                                                  placeholder="e.g. English"
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
                                                  value={language.progress}
                                                  onChange={(e) =>
                                                       handleLanguageChange(index, 'progress', e.target.value)
                                                  }
                                                  className="w-full border border-gray-300 px-2 py-1.5 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                                                  placeholder="e.g. 90"
                                             />
                                        </div>
                                   </div>

                                   <div className="flex justify-end">
                                        <button
                                             onClick={() => handleRemoveLanguage(index)}
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

export default LanguageSection;
