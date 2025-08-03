import { User } from "lucide-react";


function Avatar({ name = "User" }) {
     return (
          <div className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 transition cursor-pointer">
               <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 text-white rounded-full shadow-md">
                    <User className="w-5 h-5" />
               </div>
               <span className="text-white hidden sm:inline-block font-medium text-gray-800">
                    {name}
               </span>
          </div>
     );
}

export default Avatar;
