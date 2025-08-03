
import ResumePDF from "./ResumePDF";


import { PDFDownloadLink } from "@react-pdf/renderer";
const DownloadPDFButton = ({ resumeData }) => {
     return (
          <div className="flex justify-end mb-4">
               <PDFDownloadLink
                    document={<ResumePDF resumeData={resumeData} />}
                    fileName="resume.pdf"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
               >
                    {({ loading }) => (loading ? "Preparing..." : "Download PDF")}
               </PDFDownloadLink>
          </div>
     );
};

export default DownloadPDFButton;
