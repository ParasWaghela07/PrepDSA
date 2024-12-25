import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Notfound() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 text-gray-100 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-6"
      >
        <h1 className="text-8xl font-extrabold text-teal-400">404</h1>
        <p className="text-xl font-medium text-gray-300">
          Oops! The page you are looking for does not exist.
        </p>
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="mt-6"
        >
          <Link
            to="/"
            className="bg-teal-400 text-gray-900 px-6 py-3 rounded-lg text-lg font-semibold shadow-lg"
          >
            Go Back Home
          </Link>
        </motion.div>
        {/* Decorative Circles */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ delay: 0.5, duration: 1.5 }}
          className="absolute w-96 h-96 bg-teal-400 rounded-full blur-3xl -top-40 -left-20"
        ></motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ delay: 0.8, duration: 1.5 }}
          className="absolute w-80 h-80 bg-gray-600 rounded-full blur-3xl -bottom-40 -right-20"
        ></motion.div>
      </motion.div>
    </div>
  );
}

export default Notfound;
