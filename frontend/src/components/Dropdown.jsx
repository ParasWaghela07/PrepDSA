import React from 'react'
import { useState } from 'react';
import {motion} from 'framer-motion'
import { delay } from 'framer-motion';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

export const Dropdown = ({title,children}) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-gray-500">
          <button
            className="w-full flex justify-between items-center p-3 text-gray-200 bg-gray-900 rounded-lg text-xl font-semibold"
            onClick={() => setIsOpen(!isOpen)}
          >
            {title}
            <span>{isOpen ? <IoIosArrowUp />
 : <IoIosArrowDown />}</span>
          </button>
          {isOpen &&       <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="p-3 text-gray-100">{children}</div>
      </motion.div>}
        </div>
      );
}
