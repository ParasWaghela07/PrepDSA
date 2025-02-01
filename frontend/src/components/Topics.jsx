import React, { useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { AppContext } from '../context/AppContext';

export const Topics = ({topics}) => {
  const navigate=useNavigate();
  
  return (
    <div >
      {topics?.length>0 ?
      topics.map((topic,index)=><span className=' cursor-pointer bg-blue-500 p-2 mr-2 rounded-md w-fit ' onClick={()=>{
        navigate(`/topic/${topic._id}`);
      }} key={index}>{topic.topic_name} </span>)
    :<p>No topics</p>}
    </div>
  )
}
