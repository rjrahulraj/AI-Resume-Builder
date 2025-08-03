import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserContext } from "../../context/UserContextProvider";

const BACKEND_URL = import.meta.env.VITE_BACKENED_URL;

function CreateResumeForm() {
     const [title, setTitle] = useState("");
     const navigate = useNavigate();
     const { user, setLoading } = useUserContext();

     const onChangeTitle = (e) => {
          setTitle(e.target.value);
     };

     const onSubmit = async (e) => {
          e.preventDefault();
          if (!title.trim()) {
               toast.error("Title cannot be empty");
               return;
          }

          try {
               setLoading(true);
               const response = await fetch(`${BACKEND_URL}/api/resume`, {
                    method: "POST",
                    headers: {
                         "Content-Type": "application/json",
                         Authorization: JSON.parse(localStorage.getItem("token")),
                    },
                    body: JSON.stringify({ userId: user._id, title }),
               });

               const data = await response.json();

               if (!data.success) {
                    toast.error(data.message || "Failed to create resume");
               } else {
                    toast.success("Resume created successfully");
                    navigate(`/resume/${data.resumeId}`);
               }
          } catch (error) {
               console.error("Error creating resume:", error);
               toast.error("Error creating resume");
          } finally {
               setLoading(false);
          }
     };

     return (
          <div className="w-full max-w-md mx-auto">
               <h3 className="text-xl font-semibold text-gray-800 mb-2">Create New Resume</h3>
               <p className="text-sm text-gray-600 mb-4">
                    Give your resume a title to get started. You can customize it later.
               </p>

               <form onSubmit={onSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col">
                         <label htmlFor="title" className="text-sm font-medium text-gray-700 mb-1">
                              Title
                         </label>
                         <input
                              type="text"
                              id="title"
                              name="title"
                              value={title}
                              onChange={onChangeTitle}
                              placeholder="e.g. Software Engineer Resume"
                              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                         />
                    </div>

                    <button
                         type="submit"
                         disabled={title.trim().length === 0}
                         className={`w-full py-2 rounded-md font-medium text-white transition 
            ${title.trim().length === 0
                                   ? "bg-blue-400 cursor-not-allowed opacity-50"
                                   : "bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-[1.02]"
                              }`}
                    >
                         Create Resume
                    </button>
               </form>
          </div>
     );
}

export default CreateResumeForm;
