import React, { useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { AppContext } from '../context/AppContext';

export const Topics = ({topics}) => {
  const navigate=useNavigate();
  const {current_topic_array,setcurrent_topic_array}=useContext(AppContext);
  
  return (
    <div >
      {topics?.length>0 ?
      topics.map((topic,index)=><span className=' cursor-pointer bg-blue-500 p-2 mr-2 rounded-md w-fit ' onClick={()=>{
        setcurrent_topic_array(topic.question_list);
        //console.log(topic.question_list)
        navigate(`/topic`);
      }} key={index}>{topic.topic_name} </span>)
    :<p>No topics</p>}
    </div>
  )
}
