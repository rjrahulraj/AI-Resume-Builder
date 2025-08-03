import React from "react";
import {
     Page,
     Text,
     View,
     Document,
     StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
     page: {
          padding: 30,
          fontSize: 10,
          fontFamily: "Helvetica",
          lineHeight: 1.6,
          backgroundColor: "#ffffff",
          color: "#111827",
     },
     header: {
          marginBottom: 12,
          paddingBottom: 8,
          borderBottomWidth: 2,
          borderBottomColor: "#1F2937",
          alignItems: "center",
     },
     name: {
          fontSize: 22,
          fontWeight: "bold",
          color: "#1F2937",
          textAlign: "center",
     },
     designation: {
          fontSize: 12,
          color: "#374151",
          textAlign: "center",
     },
     summary: {
          fontSize: 10,
          color: "#4B5563",
          textAlign: "center",
          marginTop: 4,
     },
     section: {
          marginBottom: 10,
     },
     sectionTitle: {
          fontSize: 12,
          fontWeight: "bold",
          color: "#1F2937",
          marginBottom: 4,
          textTransform: "uppercase",
     },
     text: {
          fontSize: 10,
          color: "#374151",
          marginBottom: 2,
     },
     subheading: {
          fontWeight: "bold",
          fontSize: 10,
     },
     smallText: {
          fontSize: 9,
          color: "#6B7280",
     },
     chipContainer: {
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 4,
     },

     chip: {
          backgroundColor: "#E0F2FE",
          color: "#0369A1",
          fontSize: 9,
          paddingHorizontal: 6,
          paddingVertical: 2,
          borderRadius: 4,
          marginRight: 6,
          marginBottom: 4,
          textAlign: "center",
          minWidth: 40,
     },

     contactRow: {
          flexDirection: "row",
          justifyContent: "space-between",
     },
     contactCol: {
          width: "48%",
     },
     bullet: {
          marginRight: 4,
     },
});

const ResumePDF = ({ resumeData }) => {
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
     } = resumeData || {};

     return (
          <Document>
               <Page size="A4" style={styles.page}>
                    {/* Header */}
                    <View style={styles.header}>
                         <Text style={styles.name}>{profileInfo?.fullname || "Your Full Name"}</Text>
                         <Text style={styles.designation}>{profileInfo?.designation}</Text>
                         <Text style={styles.summary}>{profileInfo?.summary}</Text>
                    </View>

                    {/* Contact */}
                    <View style={styles.section}>
                         <Text style={styles.sectionTitle}>Contact</Text>
                         <View style={styles.contactRow}>
                              <View style={styles.contactCol}>
                                   <Text style={styles.text}>• Email: {contactInfo?.email}</Text>
                                   <Text style={styles.text}>• Phone: {contactInfo?.phone}</Text>
                                   <Text style={styles.text}>• Location: {contactInfo?.location}</Text>
                              </View>
                              <View style={styles.contactCol}>
                                   <Text style={styles.text}>• LinkedIn: {contactInfo?.linkedin}</Text>
                                   <Text style={styles.text}>• GitHub: {contactInfo?.github}</Text>
                                   <Text style={styles.text}>• Website: {contactInfo?.website}</Text>
                              </View>
                         </View>
                    </View>

                    {/* Work Experience */}
                    {workExperience?.length > 0 && (
                         <View style={styles.section}>
                              <Text style={styles.sectionTitle}>Work Experience</Text>
                              {workExperience.map((exp, idx) => (
                                   <View key={idx}>
                                        <Text style={styles.subheading}>• {exp.role} - {exp.company}</Text>
                                        <Text style={styles.smallText}>{exp.startDate} - {exp.endDate}</Text>
                                        <Text style={styles.text}>{exp.description}</Text>
                                   </View>
                              ))}
                         </View>
                    )}

                    {/* Education */}
                    {education?.length > 0 && (
                         <View style={styles.section}>
                              <Text style={styles.sectionTitle}>Education</Text>
                              {education.map((edu, idx) => (
                                   <View key={idx}>
                                        <Text style={styles.subheading}>• {edu.degree} - {edu.institution}</Text>
                                        <Text style={styles.smallText}>{edu.startDate} - {edu.endDate}</Text>
                                        <Text style={styles.text}>{edu.description}</Text>
                                   </View>
                              ))}
                         </View>
                    )}

                    {/* Projects */}
                    {projects?.length > 0 && (
                         <View style={styles.section}>
                              <Text style={styles.sectionTitle}>Projects</Text>
                              {projects.map((proj, idx) => (
                                   <View key={idx}>
                                        <Text style={styles.subheading}>• {proj.title}</Text>
                                        <Text style={styles.text}>{proj.description}</Text>
                                        <Text style={styles.smallText}>GitHub: {proj.github}</Text>
                                        <Text style={styles.smallText}>Live Demo: {proj.liveDemo}</Text>
                                   </View>
                              ))}
                         </View>
                    )}

                    {/* Certifications */}
                    {certifications?.length > 0 && (
                         <View style={styles.section}>
                              <Text style={styles.sectionTitle}>Certifications</Text>
                              {certifications.map((cert, idx) => (
                                   <Text key={idx} style={styles.text}>• {cert.title} - {cert.issuer} ({cert.year})</Text>
                              ))}
                         </View>
                    )}

                    {/* Skills */}
                    {skills?.length > 0 && (
                         <View style={styles.section}>
                              <Text style={styles.sectionTitle}>Skills</Text>
                              <View style={styles.chipContainer}>
                                   {skills.map((skill, idx) => (
                                        <Text key={idx} style={styles.chip}>{skill.name}</Text>
                                   ))}
                              </View>
                         </View>
                    )}

                    {/* Languages */}
                    {languages?.length > 0 && (
                         <View style={styles.section}>
                              <Text style={styles.sectionTitle}>Languages</Text>
                              <View style={styles.chipContainer}>
                                   {languages.map((lang, idx) => (
                                        <Text key={idx} style={styles.chip}>{lang.name}</Text>
                                   ))}
                              </View>
                         </View>
                    )}

                    {/* Interests */}
                    {interests?.length > 0 && (
                         <View style={styles.section}>
                              <Text style={styles.sectionTitle}>Interests</Text>
                              <Text style={styles.text}>• {interests.join(", ")}</Text>
                         </View>
                    )}
               </Page>
          </Document>
     );
};

export default ResumePDF;
