
import { Zap, LayoutTemplate, Download, Sparkles } from "lucide-react";

const featuresProperties = [
     {
          icon: <Zap className="w-8 h-8 text-blue-500" />,
          title: "Lightning Fast",
          description:
               "Create professional resumes in under 5 minutes with our streamlined process",
          gradient: "bg-gradient-to-r from-blue-400 to-indigo-500 text-white",
          bg: "bg-indigo-100",
     },
     {
          icon: <LayoutTemplate className="w-8 h-8 text-pink-500" />,
          title: "Pro Templates",
          description:
               "Choose from dozens of recruiter-approved, industry-specific templates",
          gradient: "bg-gradient-to-r from-pink-400 bto-fuchsia-500 text-white",
          bg: "bg-fuchsia-100",
     },
     {
          icon: <Download className="w-8 h-8 text-orange-500" />,
          title: "Instant Export",
          description: "Download high-quality PDFs instantly with perfect formatting",
          gradient: "bg-gradient-to-r from-orange-400 to-yellow-500 text-white",
          bg: "bg-orange-100",
     },
     {
          icon: <Sparkles className="w-8 h-8 text-purple-500" />,
          title: "AI-Powered Resume Builder",
          description: "Generate personalized, ATS-friendly resumes in seconds using AI.",
          gradient: "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
          bg: "bg-purple-100",
     }

];



function Features() {
     return (
          <div className="">
               <section className="m-16 bg-grey-100 text-gray-800 px-4 sm:px-8 lg:px-24 ">
                    <div className="text-center mb-10">
                         <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-800">
                              Why Choose{' '}
                              <span className="bg-gradient-to-r from-red-500 via-yellow-400 to-blue-500 bg-clip-text text-transparent">
                                   AI Resume Builder ✦
                              </span>
                              ?
                         </h3>
                         <p className="text-base sm:text-lg text-gray-600 mt-2">
                              Everything you need to create a professional resume in minutes with AI ✦.
                         </p>
                    </div>

                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-center">
                         {featuresProperties.map((feature, index) => (
                              <div
                                   key={index}
                                   className={`rounded-2xl p-6 shadow-lg transition transform hover:-translate-y-1 hover:shadow-xl ${feature.bg}`}
                              >
                                   <div
                                        className={`p-4 rounded-full mb-4 inline-block ${feature.gradient}`}
                                   >
                                        {feature.icon}
                                   </div>
                                   <h4 className="text-xl font-bold mb-2 text-gray-800">
                                        {feature.title}
                                   </h4>
                                   <p className="text-sm text-gray-700">{feature.description}</p>
                              </div>
                         ))}
                    </div>
               </section>


          </div>
     )
}

export default Features
