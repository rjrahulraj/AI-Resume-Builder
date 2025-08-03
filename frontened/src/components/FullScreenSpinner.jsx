function FullScreenSpinner() {
     return (
          <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
               <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
     );
}

export default FullScreenSpinner;