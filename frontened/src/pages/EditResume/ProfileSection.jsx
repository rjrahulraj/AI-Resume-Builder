import { useUserContext } from '../../context/UserContextProvider';


function ProfileSection({ resumeData, setResumeData, handleChange, renderInput }) {
     const { user } = useUserContext();
     return (
          <div className="w-full px-4 sm:px-6 lg:px-8">
               <section className="mb-10">
                    <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                         <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Profile Information</h2>
                    </div>

                    <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6 transition hover:shadow-md">
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                              {renderInput(
                                   "Full Name",
                                   resumeData.profileInfo.fullName || '',
                                   (val) => handleChange("profileInfo", "fullName", val)
                              )}
                              {renderInput(
                                   "Designation",
                                   resumeData.profileInfo.designation || '',
                                   (val) => handleChange("profileInfo", "designation", val)
                              )}
                         </div>

                         <div className="mb-2">
                              <label className="text-sm font-medium block mb-1 text-gray-700">Summary</label>
                              <textarea
                                   value={resumeData.profileInfo.summary || ''}
                                   onChange={(e) =>
                                        handleChange("profileInfo", "summary", e.target.value)
                                   }
                                   className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                   rows="4"
                                   placeholder="Brief overview about yourself, experience, or objectives"
                              />
                         </div>
                    </div>
               </section>
          </div>
     );
}

export default ProfileSection;     