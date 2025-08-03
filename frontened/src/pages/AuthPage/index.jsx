import { useState } from 'react';
const BACKENED_URL = import.meta.env.VITE_BACKENED_URL;
import { toast } from 'react-toastify';
import message from "../../utils/toastify";
import { useUserContext } from '../../context/UserContextProvider';
const initialFormData = {
     name: "",
     email: "",
     password: ""
}

import { useNavigate } from 'react-router-dom';


function AuthPage() {
     const [isLogin, setIsLogin] = useState(true);
     const [formData, setFormData] = useState(initialFormData);
     const navigate = useNavigate();

     const handleChange = (e) => {
          setFormData({
               ...formData,
               [e.target.name]: e.target.value
          })
     };
     const toggleForm = () => {
          setIsLogin(!isLogin);
          setFormData(initialFormData)
     };
     const { updateUser } = useUserContext();

     const handleSubmit = async (e) => {

          e.preventDefault();

          try {
               let URL = `${BACKENED_URL}/api/auth/register`
               if (isLogin) {
                    URL = `${BACKENED_URL}/api/auth/login`;
               }
               let response = await fetch(URL, {
                    method: 'POST',
                    headers: {
                         'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
               })
               let data = await response.json();
               console.log(data);
               if (!data.success) {
                    toast.error(data.message, message.error);
                    return;
               }
               else {
                    toast.success(data.message, message.success);
                    updateUser(data);
                    navigate('/');
                    return;
               }
          } catch (error) {
               console.log(`Error in handleSubmit in AuthPage :: ${error}`);
               toast.error("Something went wrong", message.error);
          } finally {
               setFormData(initialFormData);
          }

     }

     return (
          <div className="pt-20 min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-400 to-pink-500 p-4">
               <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-6">
                    <h2 className="text-2xl font-bold text-center text-gray-800">
                         {isLogin ? 'Login to Your Account' : 'Create a New Account'}
                    </h2>

                    <form className="space-y-4">
                         {!isLogin && (
                              <input
                                   type="text"
                                   placeholder="Full Name"
                                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                                   name='name'
                                   onChange={(e) => handleChange(e)}
                              />
                         )}

                         <input
                              type="email"
                              placeholder="Email"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                              name='email'
                              onChange={(e) => handleChange(e)}
                         />

                         <input
                              type="password"
                              placeholder="Password"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                              name='password'
                              onChange={(e) => handleChange(e)}
                         />

                         <button
                              type="submit"
                              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold transition"
                              onClick={(e) => handleSubmit(e)}
                         >
                              {isLogin ? 'Login' : 'Register'}
                         </button>
                    </form>

                    <p className="text-sm text-center text-gray-600">
                         {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                         <button onClick={toggleForm} className="text-orange-600 font-medium hover:underline">
                              {isLogin ? 'Register' : 'Login'}
                         </button>
                    </p>
               </div>
          </div>
     );
}

export default AuthPage;
