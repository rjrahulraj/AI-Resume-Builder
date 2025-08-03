import React from "react";
import "./TemplateThree.css";

const TemplateFive = ({ resumeData }) => {
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
          <div id="resume-preview" className="template-five">
               <header>
                    <h1>{profileInfo?.fullName || "Your Name"}</h1>
                    <p className="designation">{profileInfo?.designation || "Job Title"}</p>
                    <p className="summary">{profileInfo?.summary}</p>
               </header>

               <section className="contact">
                    {contactInfo?.email && <span>Email: {contactInfo.email}</span>}
                    {contactInfo?.phone && <span> | Phone: {contactInfo.phone}</span>}
                    {contactInfo?.location && <span> | Location: {contactInfo.location}</span>}
                    {contactInfo?.linkedin && <span> | LinkedIn: {contactInfo.linkedin}</span>}
               </section>

               <section className="timeline-section">
                    <h2>Professional Experience</h2>
                    <div className="timeline">
                         {workExperience?.map((exp, idx) => (
                              <div className="entry" key={idx}>
                                   <div className="date">{exp.startDate} – {exp.endDate || "Present"}</div>
                                   <div className="details">
                                        <h3>{exp.role} @ {exp.company}</h3>
                                        <ul>
                                             {exp.description?.split("\n").map((line, i) => (
                                                  <li key={i}>{line.trim()}</li>
                                             ))}
                                        </ul>
                                   </div>
                              </div>
                         ))}
                    </div>
               </section>

               <section className="timeline-section">
                    <h2>Education</h2>
                    <div className="timeline">
                         {education?.map((edu, idx) => (
                              <div className="entry" key={idx}>
                                   <div className="date">{edu.startDate} – {edu.endDate || "Present"}</div>
                                   <div className="details">
                                        <h3>{edu.degree}, {edu.institution}</h3>
                                   </div>
                              </div>
                         ))}
                    </div>
               </section>

               {skills?.length > 0 && (
                    <section>
                         <h2>Skills</h2>
                         <ul className="pill-list">
                              {skills.map((s, idx) => <li key={idx}>{s.name}</li>)}
                         </ul>
                    </section>
               )}

               {projects?.length > 0 && (
                    <section>
                         <h2>Projects</h2>
                         {projects.map((proj, idx) => (
                              <div key={idx} className="project-block">
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
                    <section>
                         <h2>Certifications</h2>
                         <ul>
                              {certifications.map((c, idx) => (
                                   <li key={idx}>{c.title} – {c.issuer} ({c.year})</li>
                              ))}
                         </ul>
                    </section>
               )}

               {languages?.length > 0 && (
                    <section>
                         <h2>Languages</h2>
                         <ul className="pill-list">
                              {languages.map((l, idx) => <li key={idx}>{l.name}</li>)}
                         </ul>
                    </section>
               )}

               {interests?.length > 0 && (
                    <section>
                         <h2>Interests</h2>
                         <p>{interests.join(", ")}</p>
                    </section>
               )}
          </div>
     );
};

export default TemplateFive;
