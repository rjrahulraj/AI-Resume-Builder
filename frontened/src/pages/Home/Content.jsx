import { useNavigate } from "react-router-dom";
import TypingText from "../../components/TypingText";

const statistics = [
     {
          value: "50K+",
          label: "Resumes Created",
          gradient: "from-violet-600 to-fuchsia-600",
     },
     {
          value: "4.9★",
          label: "User Rating",
          gradient: "from-orange-500 to-red-500",
     },
     {
          value: "5 Min",
          label: "Build Time",
          gradient: "from-emerald-500 to-teal-500",
     },
];

function Content() {
     const navigate = useNavigate();

     return (
          <div className="pt-16 min-h-[calc(100vh-4rem)] bg-pink-50 text-gray-800 px-4 sm:px-8 lg:px-24">
               <section className="flex flex-col lg:flex-row items-center justify-between gap-12">

                    {/* Left Side Content */}
                    <div className="w-full lg:w-1/2 space-y-6">
                         <h1 className="text-3xl sm:text-3xl font-extrabold text-black">
                              Build Professional Resume with AI ✦
                         </h1>
                         {/* <TypingText text="Craft your resume effortlessly with AI — tailored, stunning, and ready in seconds!" speed={50} /> */}

                         <p className="text-base sm:text-lg font-medium bg-gradient-to-r from-red-500 via-yellow-400 to-blue-500 bg-clip-text text-transparent">
                              "Craft your resume effortlessly with AI — tailored, stunning, and ready in seconds!"
                         </p>

                         <div className="flex flex-col sm:flex-row gap-4">
                              <button onClick={() => navigate("/dashboard")} className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white text-sm sm:text-base font-medium rounded-full shadow-md transition">
                                   Start Building
                              </button>

                         </div>

                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-6">
                              {statistics.map((stat, index) => (
                                   <div
                                        key={index}
                                        className={`flex flex-col items-center justify-center p-4 bg-gradient-to-r ${stat.gradient} text-white rounded-lg shadow-lg`}
                                   >
                                        <h2 className="text-2xl font-bold">{stat.value}</h2>
                                        <p className="text-sm mt-1">{stat.label}</p>
                                   </div>
                              ))}
                         </div>
                    </div>

                    {/* Right Side SVG */}
                    <div className="w-full lg:w-1/2 flex justify-center">
                         <svg viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-md">
                              <defs>
                                   <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#8b5cf6" />
                                        <stop offset="100%" stopColor="#d946ef" />
                                   </linearGradient>
                                   <linearGradient id="cardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#ffffff" />
                                        <stop offset="100%" stopColor="#f8fafc" />
                                   </linearGradient>
                              </defs>

                              <rect x="50" y="50" width="300" height="400" rx="20" fill="url(#cardGradient)" />
                              <circle cx="120" cy="120" r="25" fill="#d946ef" />
                              <rect x="160" y="105" width="120" height="8" rx="4" fill="#8b5cf6" />
                              <rect x="160" y="120" width="80" height="6" rx="3" fill="#8b5cf6" />
                              <rect x="70" y="170" width="260" height="4" rx="2" fill="#ddd" />
                              <rect x="70" y="185" width="200" height="4" rx="2" fill="#ddd" />
                              <rect x="70" y="200" width="240" height="4" rx="2" fill="#ddd" />
                              <rect x="70" y="230" width="60" height="6" rx="3" fill="#d946ef" />
                              <rect x="70" y="250" width="40" height="15" rx="7" fill="#f43f5e" />
                              <rect x="120" y="250" width="50" height="15" rx="7" fill="#f59e0b" />
                              <rect x="180" y="250" width="45" height="15" rx="7" fill="#10b981" />
                              <rect x="70" y="290" width="80" height="6" rx="3" fill="#ddd" />
                              <rect x="70" y="310" width="180" height="4" rx="2" fill="#ddd" />
                              <rect x="70" y="325" width="150" height="4" rx="2" fill="#ddd" />
                              <rect x="70" y="340" width="200" height="4" rx="2" fill="#ddd" />

                              <circle cx="320" cy="100" r="15" fill="#f59e0b">
                                   <animateTransform
                                        attributeName="transform"
                                        type="translate"
                                        values="0,0; 0,-10; 0,0"
                                        dur="3s"
                                        repeatCount="indefinite"
                                   />
                              </circle>
                              <rect x="30" y="300" width="12" height="12" rx="6" fill="#f43f5e">
                                   <animateTransform
                                        attributeName="transform"
                                        type="translate"
                                        values="0,0; 5,0; 0,0"
                                        dur="2s"
                                        repeatCount="indefinite"
                                   />
                              </rect>
                              <polygon points="360,200 370,220 350,220" fill="#10b981">
                                   <animateTransform
                                        attributeName="transform"
                                        type="rotate"
                                        values="0 360 210; 360 360 210; 0 360 210"
                                        dur="4s"
                                        repeatCount="indefinite"
                                   />
                              </polygon>
                         </svg>
                    </div>
               </section>


          </div>
     );
}

export default Content;
