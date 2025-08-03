import { RxCross1 } from "react-icons/rx";

function Modal2({ isOpen, onClose, children }) {
     if (!isOpen) return null;

     return (
          <>
               {/* Overlay */}
               <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    {/* Modal Content */}
                    <div className="bg-white rounded-xl shadow-lg max-w-md w-full mx-4 p-6 relative">
                         {/* Close Button */}
                         <button
                              onClick={onClose}
                              className="absolute  top-3 right-3 text-gray-500 hover:text-red-500"
                         >
                              <RxCross1 size={20} />
                         </button>

                         {/* Modal Body */}
                         <div>{children}</div>
                    </div>
               </div>
          </>
     );
}

export default Modal2;
