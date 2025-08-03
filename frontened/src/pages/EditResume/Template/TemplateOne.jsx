import React from "react";
import "./Templateone.css";

const TemplateOne = ({ resumeData }) => {
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
          <div id="resume-preview" className="resume-container">
               {/* Sidebar */}
               <aside className="resume-sidebar">
                    <h1 className="name">{profileInfo?.fullName || "Your Name"}</h1>
                    <p className="designation">{profileInfo?.designation || "Job Title"}</p>
                    {profileInfo?.summary && <p className="summary">{profileInfo.summary}</p>}

                    <section className="sidebar-section">
                         <h2>Contact</h2>
                         <ul>
                              {contactInfo?.email && <li>Email: {contactInfo.email}</li>}
                              {contactInfo?.phone && <li>Phone: {contactInfo.phone}</li>}
                              {contactInfo?.location && <li>Location: {contactInfo.location}</li>}
                              {contactInfo?.linkedin && <li>LinkedIn: {contactInfo.linkedin}</li>}
                              {contactInfo?.github && <li>GitHub: {contactInfo.github}</li>}
                              {contactInfo?.website && <li>Website: {contactInfo.website}</li>}
                         </ul>
                    </section>

                    {skills?.length > 0 && (
                         <section className="sidebar-section">
                              <h2>Skills</h2>
                              <ul className="tag-list">
                                   {skills.map((skill, idx) => (
                                        <li key={idx}>{skill.name}</li>
                                   ))}
                              </ul>
                         </section>
                    )}

                    {languages?.length > 0 && (
                         <section className="sidebar-section">
                              <h2>Languages</h2>
                              <ul className="tag-list">
                                   {languages.map((lang, idx) => (
                                        <li key={idx}>{lang.name}</li>
                                   ))}
                              </ul>
                         </section>
                    )}

                    {interests?.length > 0 && (
                         <section className="sidebar-section">
                              <h2>Interests</h2>
                              <p>{interests.join(", ")}</p>
                         </section>
                    )}
               </aside>

               {/* Main Content */}
               <main className="resume-main">
                    {workExperience?.length > 0 && (
                         <section className="main-section">
                              <h2>Professional Experience</h2>
                              {workExperience.map((exp, idx) => (
                                   <div key={idx}>
                                        <h3>
                                             {exp.role} @ {exp.company}
                                        </h3>
                                        <p className="date">
                                             {exp.startDate} – {exp.endDate || "Present"}
                                        </p>
                                        <ul>
                                             {exp.description?.split("\n").map((line, i) => (
                                                  <li key={i}>{line.trim()}</li>
                                             ))}
                                        </ul>
                                   </div>
                              ))}
                         </section>
                    )}

                    {education?.length > 0 && (
                         <section className="main-section">
                              <h2>Education</h2>
                              {education.map((edu, idx) => (
                                   <div key={idx}>
                                        <h3>
                                             {edu.degree}, {edu.institution}
                                        </h3>
                                        <p className="date">
                                             {edu.startDate} – {edu.endDate || "Present"}
                                        </p>
                                        <p>{edu.description}</p>
                                   </div>
                              ))}
                         </section>
                    )}

                    {projects?.length > 0 && (
                         <section className="main-section">
                              <h2>Projects</h2>
                              {projects.map((proj, idx) => (
                                   <div key={idx}>
                                        <h3>{proj.title}</h3>
                                        <ul>
                                             {proj.description?.split("\n").map((line, i) => (
                                                  <li key={i}>{line.trim()}</li>
                                             ))}
                                        </ul>
                                   </div>
                              ))}
                         </section>
                    )}

                    {certifications?.length > 0 && (
                         <section className="main-section">
                              <h2>Certifications</h2>
                              <ul>
                                   {certifications.map((cert, idx) => (
                                        <li key={idx}>
                                             {cert.title} – {cert.issuer} ({cert.year})
                                        </li>
                                   ))}
                              </ul>
                         </section>
                    )}
               </main>
          </div>
     );
};

export default TemplateOne;
