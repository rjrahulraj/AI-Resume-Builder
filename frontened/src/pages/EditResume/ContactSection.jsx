import React from 'react';

function ContactSection({ resumeData, setResumeData, handleChange, renderInput }) {
     return (
          <div className="w-full px-4 sm:px-6 lg:px-8">
               <section className="mb-10">
                    <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                         <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                              Contact Information
                         </h2>
                    </div>

                    <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6 transition hover:shadow-md">
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {Object.entries(resumeData.contactInfo).map(([key, value]) =>
                                   renderInput(
                                        key
                                             .replace(/([A-Z])/g, " $1")
                                             .replace(/^./, (str) => str.toUpperCase()), // Capitalize first letter and add spaces before capital letters
                                        value,
                                        (val) => handleChange("contactInfo", key, val)
                                   )
                              )}
                         </div>
                    </div>
               </section>
          </div>
     );
}

export default ContactSection;
