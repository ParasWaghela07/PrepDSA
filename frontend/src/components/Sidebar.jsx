import React, { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ConfirmationModal } from "../components/ConfirmationModal";
import { MdLogout, MdMenu } from "react-icons/md";
import { FaUser, FaCode, FaCalculator, FaMicrochip, FaComments } from "react-icons/fa";
import { AppContext } from "../context/AppContext";

export const Sidebar = () => {
  const tabs = [
    { name: "Profile", path: "/profile", icon: <FaUser /> },
    { name: "DSA", path: "/landing", icon: <FaCode /> },
    { name: "Aptitude", path: "/aptitude", icon: <FaCalculator /> },
    { name: "Technical Questions", path: "/techlanding", icon: <FaMicrochip /> },
    { name: "Mock Interview", path: "/mockinterview", icon: <FaComments /> },
  ];

  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const path = location.pathname;
  const { user } = useContext(AppContext);
  const userimg = user?.userImg;

  const logout = async () => {
    try {
      const response = await fetch("http://localhost:4000/logout", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const res = await response.json();
      if (res.success) {
        localStorage.clear();
        window.location.href = "/";
      }
    } catch (e) {
      console.log(e);
    }
  };

  function cancel() {
    setModal(false);
  }

  return (
    <>
      {/* Hamburger Icon for Mobile */}
      <div className="sm:hidden fixed top-4 left-4 text-white z-50 text-3xl cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <MdMenu />
      </div>

      {/* Sidebar */}
      <div
        className={`fixed sm:relative z-40 w-[65%] sm:w-[13%] flex flex-col justify-between items-center h-full bg-gray-700 py-5 border-r-2 border-gray-500 transition-all duration-300 ${
          isOpen ? "left-0" : "-left-full"
        } sm:left-0`}
      >
        <div className="font-bold text-lg sm:text-xl text-teal-500">Dashboard</div>

        <div className="w-full flex flex-col justify-between items-center h-full bg-gray-700 py-5">
          <div className="w-full flex flex-col gap-y-3 text-sm sm:text-md font-semibold text-teal-200">
            {tabs.map((tab, index) => (
              <div
                key={index}
                className={`w-full cursor-pointer p-2 transition duration-200 ${
                  path === tab.path ? "border-l-2 text-gray-50 bg-gray-50/[0.1]" : "hover:bg-gray-600"
                }`}
                onClick={() => {
                  navigate(tab.path);
                  setIsOpen(false);
                }}
              >
                <div className="flex gap-x-2 items-center">
                  {tab.name === "Profile" ? (
                    <img src={userimg} alt="" className="w-7 rounded-full aspect-square object-cover" />
                  ) : (
                    tab.icon
                  )}
                  {tab.name}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col text-teal-300 font-semibold justify-center items-start text-sm sm:text-xl">
            <div className="hover:text-white cursor-pointer flex px-1 py-2 items-center gap-x-2 transition duration-200" onClick={() => setModal(true)}>
              <MdLogout />
              <p>Log out</p>
            </div>
          </div>

          {modal && (
            <ConfirmationModal
              title="Are you sure?"
              desc="Logging out will end your current session. Any unsaved changes might be lost."
              btn1="Cancel"
              btn2="Logout"
              btn1fn={cancel}
              btn2fn={logout}
            />
          )}
        </div>
      </div>

      {/* Overlay for Mobile */}
      {isOpen && <div className="fixed inset-0 bg-black opacity-50 sm:hidden" onClick={() => setIsOpen(false)}></div>}
    </>
  );
};
