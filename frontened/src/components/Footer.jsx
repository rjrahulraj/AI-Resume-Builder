import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

function Footer() {
     return (
          <footer className="bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 text-white px-6 py-12">
               <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {/* Branding */}
                    <div>
                         <h1 className="text-2xl font-bold">AI Resume Builder ✦</h1>
                         <p className="mt-3 text-sm text-white/80 max-w-xs leading-relaxed">
                              Build job-winning resumes in minutes with our powerful, easy-to-use platform.
                         </p>
                    </div>

                    {/* Support Links */}
                    <div className="space-y-4">
                         <h3 className="text-lg font-semibold">Support</h3>
                         <ul className="space-y-2 text-sm">
                              <li><a href="#" className="hover:underline transition">Contact Us</a></li>
                              <li><a href="#" className="hover:underline transition">Help Center</a></li>
                              <li><a href="#" className="hover:underline transition">Privacy Policy</a></li>
                              <li><a href="#" className="hover:underline transition">Terms of Service</a></li>
                         </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                         <h3 className="text-lg font-semibold">Follow Us</h3>
                         <div className="flex items-center gap-4 mt-4">
                              <a href="#" aria-label="Facebook" className="hover:text-blue-500 transition">
                                   <FaFacebook className="w-6 h-6" />
                              </a>
                              <a href="#" aria-label="Twitter" className="hover:text-sky-400 transition">
                                   <FaTwitter className="w-6 h-6" />
                              </a>
                              <a href="#" aria-label="Instagram" className="hover:text-pink-500 transition">
                                   <FaInstagram className="w-6 h-6" />
                              </a>
                              <a href="#" aria-label="LinkedIn" className="hover:text-blue-700 transition">
                                   <FaLinkedin className="w-6 h-6" />
                              </a>
                         </div>
                    </div>
               </div>

               {/* Bottom Text */}
               <div className="border-t border-white/30 mt-12 pt-6 text-center text-sm text-white/70">
                    © {new Date().getFullYear()} <strong>ResumeBuilder</strong>. All rights reserved.
               </div>
          </footer>
     );
}

export default Footer;
