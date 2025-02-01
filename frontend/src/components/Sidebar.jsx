import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { ConfirmationModal } from "../components/ConfirmationModal";
import { useLocation } from 'react-router-dom';
import { MdLogout } from "react-icons/md";
import { FaUser, FaCode, FaCalculator, FaMicrochip, FaComments } from "react-icons/fa";
import { AppContext } from '../context/AppContext';

export const Sidebar = () => {
  const tabs = [
    { name: "Profile", path: "/profile", icon: <FaUser /> },
    { name: "DSA", path: "/landing", icon: <FaCode /> },
    { name: "Aptitude", path: "/aptitude", icon: <FaCalculator /> },
    { name: "Technical Questions", path: "/technical", icon: <FaMicrochip /> },
    { name: "Mock Interview", path: "/mockinterview", icon: <FaComments /> }
  ];
    const navigate=useNavigate();
    const [modal, setModal] = useState(false);
    const location=useLocation();
    const path=location.pathname;
    const {user}=useContext(AppContext);
    const userimg=user.userImg;

    const logout = async () => {
        try {
          const response = await fetch('http://localhost:4000/logout', {
            method: 'GET',
            headers: {
              "Content-Type": "application/json"
            },
            credentials: "include"
          });
          const res = await response.json();
          if (res.success) {
            localStorage.clear();
            window.location.href = '/';
          }
        } catch (e) {
          console.log(e);
        }
      };
      function cancel(){
        setModal(false);
      }
  return (
    <div className='hidden sm:flex z-10 w-[13%] flex-col justify-between items-center h-full bg-gray-700 py-5 border-r-2 border-gray-500
'>
        <div className='font-bold text-2xl text-teal-500'>
            Dashboard
        </div>
        <div className='w-full flex flex-col justify-between items-center h-full bg-gray-700 py-5'>
        <div className='w-full flex flex-col gap-y-3 text-md font-semibold text-teal-200'>
            
            {tabs.map((tab,index)=>{
                return(
                    <div 
                        key={index}
                        className={`className='w-full cursor-pointer p-2 transition duration-200 ${path===tab.path?'border-l-2  text-gray-50 bg-gray-50/[0.1]':''} ${path!==tab.path?'hover:bg-gray-600':''}`}
                        onClick={()=>navigate(tab.path)}
                    >
                        <div className='flex gap-x-2 items-center'>
                          {tab.name=="Profile" ? (<img src={userimg} alt="" className='w-5 rounded-full' />)
                          :(tab.icon)}
                        {tab.name}
                        </div>
                    </div>
                )
            })}
        </div>

        
        <div className="flex flex-col text-teal-300 font-semibold justify-center items-start">
            <p 
              className="hover:text-teal-100 cursor-pointer text-md"
              onClick={() => navigate('/changepassword')}
            >
              Change password
            </p>

            <div className='hover:text-white cursor-pointer  flex px-1 py-2 items-center gap-x-2  text-center' onClick={()=>{setModal(true)}}>
            <MdLogout className=''/>
            <p
              className="text-center text-md"
            >
              Log out
            </p>
            </div>
        </div>

        {modal && <ConfirmationModal
            title="Are you sure ?"
            desc="Logging out will end your current session. Any unsaved changes might be lost."
            btn1="Cancel"
            btn2="Logout"
            btn1fn={cancel}
            btn2fn={logout}/>}
        
        </div>
    </div>
  )
}
