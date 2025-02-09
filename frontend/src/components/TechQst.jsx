import React from 'react';
import { useNavigate } from 'react-router-dom';

const TechQst = ({question}) => {

    const navigate=useNavigate();
    
    return (
        <div className='w-full flex justify-between cursor-pointer p-4 text-white bg-gray-800 h-fit rounded-lg' onClick={()=>{navigate(`/techquestion/${question._id}`)}}>
            <p className={`text-xl font-semibold`}
            >{question.question?.length>20 ? (question.question.substr(0,20) + "...") : (question.question)}</p>
            {/* <div>
                {question?.companies?.map((company,index)=>{
                    return <p>{company.company_name}</p>
                })}
            </div> */}
            <div className='flex gap-2'>
                {question?.tags?.map((tag,index)=>{
                    return <p className='font-medium bg-gray-50/[0.2] w-fit px-2 py-1 rounded-full'>{tag.tag_name}</p>
                })}
            </div>

        </div>
    );
};

export default TechQst;