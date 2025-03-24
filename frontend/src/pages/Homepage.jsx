import React, { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

function HomePage() {

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 text-gray-100 overflow-x-hidden">
      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="space-y-6"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
            Welcome to <span className="text-teal-400">InterWin</span>
          </h1>
          <p className="text-lg md:text-xl font-medium text-gray-300">
            Building a better future with solid foundations.
          </p>
          <div className="space-x-4">
            <Link to="/signup">
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="bg-teal-400 text-gray-900 px-6 py-3 rounded-lg text-lg font-semibold shadow-lg"
              >
                Get started
              </motion.button>
            </Link>
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="bg-gray-700 text-teal-400 px-6 py-3 rounded-lg text-lg font-semibold shadow-lg"
              >
                Login
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Decorative Circles */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ delay: 0.5, duration: 1.5 }}
          className="absolute w-80 h-80 bg-teal-400 rounded-full blur-3xl -top-20 -left-10"
        ></motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ delay: 0.8, duration: 1.5 }}
          className="absolute w-64 h-64 bg-gray-600 rounded-full blur-3xl -bottom-20 -right-10"
        ></motion.div>
      </header>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl font-bold text-teal-400 mb-10"
          >
            Why Choose Us?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Thorough Research",
                desc: "Thorough research and reliable data.",
              },
              {
                title: "Sheets for Last Moment Prep",
                desc: "Compilation of sheets from various genuine authors.",
              },
              {
                title: "Progress Tracking",
                desc: "Track your progress and stay motivated.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.3 }}
                className="p-6 bg-gray-800 rounded-lg shadow-lg"
              >
                <h3 className="text-2xl font-semibold mb-4 text-teal-400">
                  {feature.title}
                </h3>
                <p>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-gradient-to-r from-teal-600 to-teal-800 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl font-bold"
          >
            Ready to Join Us?
          </motion.h2>
          <p className="text-lg font-medium text-gray-200">
            Be part of a growing community.
          </p>
          <Link to="/signup">
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="bg-gray-900 text-teal-400 px-8 py-4 rounded-lg text-lg font-semibold shadow-lg"
            >
              Get started today!!
            </motion.button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-6">
        <div className="max-w-6xl mx-auto text-center">
          <p>&copy; 2024 PrepDsa. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
