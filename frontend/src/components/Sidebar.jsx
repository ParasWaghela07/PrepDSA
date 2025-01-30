import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { ConfirmationModal } from "../components/ConfirmationModal";
import { useLocation } from 'react-router-dom';

export const Sidebar = () => {
    const tabs=[
        {"name":"Profile","path":"/profile"},
        {"name":"DSA","path":"/landing"},
        {"name":"Aptitude","path":"/aptitude"},
        {"name":"Technical Questions","path":"/technical"},
        {"name":"Mock Interview","path":"/mockinterview"}
    ]
    const navigate=useNavigate();
    const [modal, setModal] = useState(false);
    const location=useLocation();
    const path=location.pathname;

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
    <div className='hidden sm:flex z-10 w-[13%] flex-col justify-between items-center h-full bg-gray-700 py-5 px-2 border-r-2 border-gray-500
'>
        <div className='font-bold text-2xl text-teal-500'>
            Dashboard
        </div>
        <div className='flex flex-col justify-between items-center h-full bg-gray-700 py-5'>
        <div className='w-full flex flex-col gap-y-3 text-md font-semibold text-teal-200'>
            
            {tabs.map((tab,index)=>{
                return(
                    <div 
                        key={index}
                        className={`className='w-full cursor-pointer p-2 transition duration-200 rounded-md ${path===tab.path?'border-l-2 rounded-none text-gray-50':''} ${path!==tab.path?'hover:bg-gray-600':''}`}
                        onClick={()=>navigate(tab.path)}
                    >
                        {tab.name}
                    </div>
                )
            })}
        </div>

        
        <div className="flex flex-col text-teal-300 font-semibold">
            <h1 
              className="hover:text-teal-100 cursor-pointer text-md"
              onClick={() => navigate('/changepassword')}
            >
              Change password
            </h1>

            <h1 
              className="hover:text-teal-100 cursor-pointer text-md"
              onClick={()=>{setModal(true)}}
            >
              Log out
            </h1>
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
