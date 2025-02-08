import React from 'react';
import { useNavigate } from 'react-router-dom';

const TechQst = ({question}) => {

    const navigate=useNavigate();
    
    return (
        <div className='cursor-pointer p-2 text-white bg-gray-800 w-fit h-fit m-2' onClick={()=>{navigate(`/techquestion/${question._id}`)}}>
            <p>{question.question}</p>
            {/* <div>
                {question?.answer?.map((ans,index)=>{
                    return <p>{ans}</p>
                })}
            </div> */}
            <div>
                {question?.companies?.map((company,index)=>{
                    return <p>{company.company_name}</p>
                })}
            </div>
            <div>
                {question?.tags?.map((tag,index)=>{
                    return <p>{tag.tag_name}</p>
                })}
            </div>

        </div>
    );
};

export default TechQst;