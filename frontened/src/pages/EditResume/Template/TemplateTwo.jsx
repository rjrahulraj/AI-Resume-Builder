import React from "react";
const TemplateTwo = ({ resumeData }) => {
     const {
          profileInfo,
          contactInfo,
          workExperience,
          education,
          skills,
          projects,
          certifications,
          languages,
          interests,
     } = resumeData;

     return (
          <div id="resume-preview" className="p-6 bg-white shadow-lg max-h-[85vh] overflow-y-auto rounded-lg text-sm custom-scrollbar leading-snug space-y-4">
               {/* Profile Info */}
               <section className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800 uppercase tracking-wide">
                         {profileInfo?.fullName || "Your Name"}
                    </h1>
                    <div className=" flex flex-col justify-center items-center ">
                         <p className="mt-1 text-gray-700">
                              {profileInfo?.designation || "Job Title"}
                         </p>
                         {profileInfo?.summary && (
                              <p className="mt-1 text-gray-700">{profileInfo.summary}</p>
                         )}
                    </div>

               </section>
               <hr />

               {/* Contact Info */}
               <section>
                    <h2 className="text-lg font-semibold text-gray-800 mb-1">
                         Contact Information
                    </h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-1 text-gray-700 list-none text-sm">
                         {contactInfo?.email && <li><strong>Email:</strong> {contactInfo.email}</li>}
                         {contactInfo?.phone && <li><strong>Phone:</strong> {contactInfo.phone}</li>}
                         {contactInfo?.location && <li><strong>Location:</strong> {contactInfo.location}</li>}
                         {contactInfo?.linkedin && (
                              <li><strong>LinkedIn:</strong>{" "}
                                   <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                        {contactInfo.linkedin}
                                   </a>
                              </li>
                         )}
                         {contactInfo?.github && (
                              <li><strong>GitHub:</strong>{" "}
                                   <a href={contactInfo.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                        {contactInfo.github}
                                   </a>
                              </li>
                         )}
                         {contactInfo?.website && (
                              <li><strong>Website:</strong>{" "}
                                   <a href={contactInfo.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                        {contactInfo.website}
                                   </a>
                              </li>
                         )}
                    </ul>
               </section>
               <hr />

               {/* Work Experience */}
               {workExperience?.length > 0 && (
                    <>
                         <section className="space-y-1">
                              <h2 className="text-lg font-semibold text-gray-800">Professional Experience</h2>
                              {workExperience.map((exp, idx) => (
                                   <div key={idx} className="space-y-1">
                                        <p className="font-semibold text-gray-800">
                                             {exp.role} <span className="text-gray-600">at</span> {exp.company}
                                        </p>
                                        <p className="text-xs text-gray-500 italic">
                                             {exp.startDate} – {exp.endDate || "Present"}
                                        </p>
                                        <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                                             {exp.description
                                                  ?.split("\n")
                                                  .map((line, i) => <li key={i}>{line.trim()}</li>)}
                                        </ul>
                                   </div>
                              ))}
                         </section>
                         <hr />
                    </>
               )}

               {/* Education */}
               {education?.length > 0 && (
                    <>
                         <section className="space-y-1">
                              <h2 className="text-lg font-semibold text-gray-800">Education</h2>
                              {education.map((edu, idx) => (
                                   <div key={idx} className="space-y-1">
                                        <p className="font-semibold text-gray-800">
                                             {edu.degree}, {edu.institution}
                                        </p>
                                        <p className="text-xs text-gray-500 italic">
                                             {edu.startDate} – {edu.endDate || "Present"}
                                        </p>
                                        <p className="text-gray-700 text-sm">{edu.description}</p>
                                   </div>
                              ))}
                         </section>
                         <hr />
                    </>
               )}

               {/* Skills */}
               {/* Skills */}
               {skills?.length > 0 && (
                    <>
                         <section>
                              <h2 className="text-lg font-semibold text-gray-800">Key Skills</h2>
                              <ul className="flex flex-wrap mt-1">
                                   {skills.map((skill, idx) => (
                                        <li
                                             key={idx}
                                             className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded mr-2 mb-2"
                                        >
                                             {skill.name}
                                        </li>
                                   ))}
                              </ul>
                         </section>
                         <hr />
                    </>
               )}


               {/* Projects */}
               {projects?.length > 0 && (
                    <>
                         <section className="space-y-1">
                              <h2 className="text-lg font-semibold text-gray-800">Projects</h2>
                              {projects.map((proj, idx) => (
                                   <div key={idx} className="space-y-1">
                                        <p className="font-semibold">{proj.title}</p>
                                        <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                                             {proj.description
                                                  ?.split("\n")
                                                  .map((line, i) => <li key={i}>{line.trim()}</li>)}
                                        </ul>
                                        <div className="text-sm space-x-2">
                                             {proj.github && (
                                                  <a href={proj.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                                       GitHub
                                                  </a>
                                             )}
                                             {proj.liveDemo && (
                                                  <a href={proj.liveDemo} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                                       Live Demo
                                                  </a>
                                             )}
                                        </div>
                                   </div>
                              ))}
                         </section>
                         <hr />
                    </>
               )}

               {/* Certifications */}
               {certifications?.length > 0 && (
                    <>
                         <section>
                              <h2 className="text-lg font-semibold text-gray-800">Certifications</h2>
                              <ul className="list-disc list-inside text-sm text-gray-700">
                                   {certifications.map((cert, idx) => (
                                        <li key={idx}>
                                             {cert.title} – {cert.issuer} ({cert.year})
                                        </li>
                                   ))}
                              </ul>
                         </section>
                         <hr />
                    </>
               )}

               {/* Languages */}
               {/* Languages */}
               {languages?.length > 0 && (
                    <>
                         <section>
                              <h2 className="text-lg font-semibold text-gray-800">Languages</h2>
                              <ul className="flex flex-wrap mt-1">
                                   {languages.map((lang, idx) => (
                                        <li
                                             key={idx}
                                             className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded mr-2 mb-2"
                                        >
                                             {lang.name}
                                        </li>
                                   ))}
                              </ul>
                         </section>
                         <hr />
                    </>
               )}


               {/* Interests */}
               {interests?.length > 0 && (
                    <>
                         <section>
                              <h2 className="text-lg font-semibold text-gray-800">Interests</h2>
                              <p className="text-gray-700 text-sm">{interests.join(", ")}</p>
                         </section>
                    </>
               )}
          </div>
     );
};

export default TemplateTwo;
