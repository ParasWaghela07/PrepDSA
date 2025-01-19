import React from 'react';
import { motion } from 'framer-motion';

const Modal = ({ isOpen, onClose, title, options, selectedOptions, toggleOption }) => {

  const handleToggleOption = (option) => {
    toggleOption(option);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-gray-900 rounded-lg shadow-lg w-[40%] p-6 max-h-[80vh] overflow-y-auto"
      >
        <h2 className="text-2xl font-bold text-teal-400 mb-4">{title}</h2>
        <div className="flex flex-wrap gap-2">
          {options.map((option) => (
            <motion.div
              key={option}
              whileHover={{ scale: 1.02 }}
              className={`p-2 rounded-lg cursor-pointer transition-all duration-150 ${
                selectedOptions?.includes(option)
                  ? 'bg-teal-500 text-gray-900'
                  : 'bg-gray-800 text-gray-100'
              }`}
              onClick={() => handleToggleOption(option)}
            >
              {option}
            </motion.div>
          ))}
        </div>
        <div className="mt-6 text-right">
          <button
            className="bg-teal-500 text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-teal-600"
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
