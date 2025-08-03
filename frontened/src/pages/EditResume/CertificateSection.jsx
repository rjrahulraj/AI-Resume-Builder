import React from 'react';
import { Plus, Minus } from 'lucide-react';

function CertificateSection({ resumeData, setResumeData, handleChange }) {
     const handleAddCertificate = () => {
          const updatedCerts = [
               ...resumeData.certifications,
               { title: '', issuer: '', year: '' },
          ];
          setResumeData((prev) => ({ ...prev, certifications: updatedCerts }));
     };

     const handleRemoveCertificate = (idx) => {
          const updatedCerts = [...resumeData.certifications];
          updatedCerts.splice(idx, 1);
          setResumeData((prev) => ({ ...prev, certifications: updatedCerts }));
     };

     return (
          <div className="w-full px-4 sm:px-6 lg:px-8">
               <section className="mb-10">
                    <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                         <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Certifications</h2>
                         <button
                              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                              onClick={handleAddCertificate}
                         >
                              <Plus className="w-4 h-4" />
                              Add Certification
                         </button>
                    </div>

                    {resumeData.certifications.map((cert, idx) => (
                         <div
                              key={idx}
                              className="bg-white shadow-sm border border-gray-200 rounded-lg mb-8 transition hover:shadow-md"
                         >
                              <div className="flex flex-wrap justify-between items-center px-4 py-3 bg-gray-100 border-b border-gray-200">
                                   <h3 className="text-lg sm:text-xl font-semibold text-gray-700">
                                        {cert.title || 'Untitled Certification'}
                                   </h3>
                                   <button
                                        onClick={() => handleRemoveCertificate(idx)}
                                        className="flex items-center gap-1 text-sm text-red-600 bg-red-100 px-3 py-1.5 rounded hover:bg-red-200 transition"
                                   >
                                        <Minus className="w-4 h-4" />
                                        Remove
                                   </button>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 py-4">
                                   <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                        <input
                                             type="text"
                                             value={cert.title}
                                             onChange={(e) => handleChange("certifications", "title", e.target.value, idx)}
                                             className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                             placeholder="e.g. Web Dev Bootcamp"
                                        />
                                   </div>

                                   <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Issuer</label>
                                        <input
                                             type="text"
                                             value={cert.issuer}
                                             onChange={(e) => handleChange("certifications", "issuer", e.target.value, idx)}
                                             className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                             placeholder="e.g. Coursera"
                                        />
                                   </div>

                                   <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                                        <input
                                             type="number"
                                             value={cert.year}
                                             onChange={(e) => handleChange("certifications", "year", e.target.value, idx)}
                                             className="w-full border border-gray-300 px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                             placeholder="e.g. 2024"
                                        />
                                   </div>
                              </div>
                         </div>
                    ))}
               </section>
          </div>
     );
}

export default CertificateSection;
