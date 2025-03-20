import React, { useEffect } from "react";
import { motion } from "framer-motion";

const Modal = ({ isOpen, onClose, title, options, selectedOptions, toggleOption }) => {
  
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]); 

  const handleToggleOption = (option) => {
    toggleOption(option);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4 overflow-y-auto">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-gray-900 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl p-6 max-h-[80vh] overflow-y-auto"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-teal-400 mb-4">{title}</h2>
        <div className="flex flex-wrap gap-2">
          {options?.map((option) => (
            <motion.div
              key={option}
              whileHover={{ scale: 1.02 }}
              className={`p-2 text-sm sm:text-base rounded-lg cursor-pointer transition-all duration-150 ${
                selectedOptions?.includes(option)
                  ? "bg-teal-500 text-gray-900"
                  : "bg-gray-800 text-gray-100"
              }`}
              onClick={() => handleToggleOption(option)}
            >
              {option}
            </motion.div>
          ))}
        </div>
        <div className="mt-6 text-right">
          <button
            className="bg-teal-500 text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-teal-600 w-full sm:w-auto"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Modal;
