import React from "react";

export const ConfirmationModal = ({ title, desc, btn1, btn2, btn1fn, btn2fn }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-[90%] sm:w-[60%] md:w-[40%] lg:w-[30%] bg-gray-900 text-white p-6 rounded-lg shadow-lg flex flex-col gap-y-6">

        <div>
          <p className="font-bold text-teal-400 text-2xl">{title}</p>
          <p className="text-gray-300 text-sm mt-2">{desc}</p>
        </div>

        <div className="flex justify-center gap-x-6 font-bold">
          <button
            className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md transition-all duration-300"
            onClick={btn1fn}
          >
            {btn1}
          </button>
          <button
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-all duration-300"
            onClick={btn2fn}
          >
            {btn2}
          </button>
        </div>
      </div>
    </div>
  );
};
