import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Dropdown } from '../components/Dropdown';

const TechQuestion = () => {
    const qstid=useParams();
    const [question,setquestion]=useState();
    const location=useLocation();

    async function getTechQuestionDetail(){
        const toastid=toast.loading('Loading');
        try {
            const response = await fetch("http://localhost:4000/getTechQuestionDetail",
                {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      qstid: qstid.qstid,
                    }),
                    credentials: "include",  
                }
            );
            const data = await response.json();
            console.log(data);
            setquestion(data.data);

            toast.dismiss(toastid);
          }
          catch (error) {
            console.error("Error fetching questions:", error);
          }
    }

    useEffect(()=>{
        getTechQuestionDetail();
    },[location.pathname])
    return (
        <div className='w-full bg-gray-800 h-full p-10 overflow-x-hidden'>
            {question && 
            <div className='flex flex-col gap-y-2 h-full w-full'>
                <p className='text-white font-bold text-4xl break-words'>{question.question}</p>
                <div className='flex items-center gap-5'>
                    <p className='font-semibold text-md text-white'>Related topics  </p>
                    <div className='flex gap-2'>
                        {question?.tags?.map((tag,index)=>{
                            return <p className='font-medium bg-gray-50/[0.2] px-2 py-1 rounded-full text-gray-100'>{tag.tag_name}</p>
                        })}
                    </div>

                </div>

                {question?.qstImg && <img src={question.qstImg} className='w-[30%]' />}


                <div className='flex flex-col gap-y-3 mt-10'>
                    {question?.answer?.map((ans,index)=>{
                        return <Dropdown title={`Answer ${index+1}`}>{ans}</Dropdown>
                    })}
                </div>

                <p className='font-semibold text-xl text-gray-200'>Did you get it on your own ?</p>

            </div>
            }
        </div>
    );
};

export default TechQuestion;