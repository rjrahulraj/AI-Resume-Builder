import { useState } from 'react';
import { FileText, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useUserContext } from '../context/UserContextProvider';
import Avatar from './Avatar';


function Header() {
     const [isOpen, setIsOpen] = useState(false);
     const { user, Logout } = useUserContext();
     const location = useLocation();

     return (
          <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white z-50 shadow-lg">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                         <FileText className="w-6 h-6" />
                         <h1 className="text-xl font-bold tracking-wide">AI Resume Builder ✦</h1>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-4">


                         {user ? (
                              <>
                                   {
                                        location.pathname.split('/')[1] !== '' && <Link to="/">
                                             <button className="px-4 py-2 text-sm font-medium bg-white text-orange-600 rounded-full hover:bg-orange-600 hover:text-white transition shadow">
                                                  Home
                                             </button>
                                        </Link>
                                   }

                                   {
                                        location.pathname.split('/')[1] !== 'dashboard' && <Link to="/dashboard">
                                             <button className="px-4 py-2 text-sm font-medium bg-white text-orange-600 rounded-full hover:bg-orange-600 hover:text-white transition shadow">
                                                  Dashboard
                                             </button>
                                        </Link>
                                   }


                                   <button
                                        onClick={Logout}
                                        className="px-4 py-2 text-sm font-medium bg-white text-orange-600 rounded-full hover:bg-red-600 hover:text-white transition shadow"
                                   >
                                        Logout
                                   </button>
                              </>
                         ) : (
                              <Link to="/auth">
                                   <button className="px-5 py-2 text-sm font-medium bg-white text-orange-600 rounded-full hover:bg-orange-600 hover:text-white transition shadow">
                                        Get Started
                                   </button>
                              </Link>
                         )}

                         {user && <Avatar name={user.name} />}
                    </div>

                    {/* Mobile Menu Icon */}
                    <div className="md:hidden">
                         <button onClick={() => setIsOpen(true)}>
                              <Menu className="w-6 h-6" />
                         </button>
                    </div>
               </div>

               {/* Mobile Slide-out Menu */}
               <div
                    className={`fixed top-0 right-0 h-full w-64 bg-white text-black transform ${isOpen ? 'translate-x-0' : 'translate-x-full'
                         } transition-transform duration-300 ease-in-out z-50 shadow-lg`}
               >
                    <div className="flex justify-between items-center p-4 border-b">
                         <h2 className="text-lg font-semibold">

                              {user ? (
                                   <div className="flex items-center rounded-lg ">
                                        <Avatar name={user.name} />
                                        <span className="text-sm font-medium">{user.name}</span>
                                   </div>
                              ) : "Menu"}
                         </h2>
                         <button onClick={() => setIsOpen(false)}>
                              <X className="w-6 h-6" />
                         </button>
                    </div>

                    <nav className="flex flex-col gap-4 p-4">


                         {user ? (
                              <>
                                   {
                                        location.pathname.split('/')[1] !== '' && <Link
                                             to="/"
                                             onClick={() => setIsOpen(false)}
                                             className="block text-center bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition shadow"
                                        >
                                             Home
                                        </Link>
                                   }


                                   {
                                        location.pathname.split('/')[1] !== 'dashboard' && <Link
                                             to="/dashboard"
                                             onClick={() => setIsOpen(false)}
                                             className="block text-center bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition shadow"
                                        >
                                             Dashboard
                                        </Link>
                                   }


                                   <button
                                        onClick={() => {
                                             Logout();
                                             setIsOpen(false);
                                        }}
                                        className="block text-center bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition shadow"
                                   >
                                        Logout
                                   </button>
                              </>
                         ) : (
                              <Link
                                   to="/auth"
                                   onClick={() => setIsOpen(false)}
                                   className="block text-center bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition shadow"
                              >
                                   Login
                              </Link>
                         )}
                    </nav>
               </div>

               {/* Overlay */}
               {isOpen && (
                    <div
                         onClick={() => setIsOpen(false)}
                         className="fixed inset-0 bg-black/50 z-40"
                    />
               )}
          </header>
     );
}

export default Header;
