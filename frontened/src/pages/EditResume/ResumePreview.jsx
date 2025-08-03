import { useState } from "react";
import TemplateOne from "./Template/TemplateOne";
import TemplateTwo from "./Template/TemplateTwo";
import TemplateThree from "./Template/TemplateThree";

const ResumePreview = ({ resumeData }) => {
     const [selectedTemplate, setSelectedTemplate] = useState("template1");

     const renderTemplate = () => {
          switch (selectedTemplate) {
               case "template1":
                    return <TemplateOne resumeData={resumeData} />;
               case "template2":
                    return <TemplateTwo resumeData={resumeData} />;
               case "template":
                    return <TemplateThree resumeData={resumeData} />;
               default:
                    return <TemplateOne resumeData={resumeData} />;
          }
     };

     return (
          <div className="flex flex-col gap-4 w-full">
               <div className="border-b border-gray-200 mb-4">
                    <nav className="flex space-x-4" aria-label="Tabs">
                         {["template1", "template2", "template3"].map((t, idx) => (
                              <button
                                   key={t}
                                   onClick={() => setSelectedTemplate(t)}
                                   className={`px-4 py-2 text-sm font-medium rounded-t-md focus:outline-none transition-all ${selectedTemplate === t
                                        ? "bg-white text-blue-600 border-t border-l border-r border-blue-600 font-semibold"
                                        : "text-gray-500 hover:text-gray-700"
                                        }`}
                              >
                                   Template {idx + 1}
                              </button>
                         ))}
                    </nav>
               </div>


               <div
                    id="resume-preview"

               >
                    {renderTemplate()}
               </div>
          </div>
     );
};

export default ResumePreview;
