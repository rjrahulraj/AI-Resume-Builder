
import { Plus, Minus } from 'lucide-react';

function InterestSections({ resumeData, setResumeData }) {
     const handleAddInterest = () => {
          setResumeData((prev) => ({
               ...prev,
               interests: [...prev.interests, ''],
          }));
     };

     const handleRemoveInterest = (index) => {
          const updatedInterests = resumeData.interests.filter((_, i) => i !== index);
          setResumeData((prev) => ({ ...prev, interests: updatedInterests }));
     };

     const handleInterestChange = (index, value) => {
          const updatedInterests = [...resumeData.interests];
          updatedInterests[index] = value;
          setResumeData((prev) => ({ ...prev, interests: updatedInterests }));
     };

     return (
          <div className="w-full px-4 sm:px-6 lg:px-8">
               <section className="mb-6">
                    <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
                         <h2 className="text-2xl font-semibold text-gray-800">Interests</h2>
                         <button
                              onClick={handleAddInterest}
                              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 transition text-sm"
                         >
                              <Plus className="w-4 h-4" />
                              Add Interest
                         </button>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                         {resumeData.interests.map((interest, idx) => (
                              <div
                                   key={idx}
                                   className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex flex-col gap-3"
                              >
                                   <input
                                        value={interest}
                                        onChange={(e) => handleInterestChange(idx, e.target.value)}
                                        className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="e.g. Music, Coding, Reading"
                                   />
                                   <div className="flex justify-end">
                                        <button
                                             onClick={() => handleRemoveInterest(idx)}
                                             className="flex items-center gap-2 bg-red-100 text-red-600 px-3 py-2 rounded-md hover:bg-red-200 transition text-sm"
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

export default InterestSections;
