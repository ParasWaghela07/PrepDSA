
const Loader2 = () => {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
          <p className="text-white mt-4 text-lg font-medium">Loading...</p>
        </div>
      </div>
    );
  };
  
  export default Loader2;