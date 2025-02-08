import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

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
        <div>
            {question && 
            <div>
                <p>{question.question}</p>
            <div>
                {question?.answer?.map((ans,index)=>{
                    return <p>{ans}</p>
                })}
            </div>
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
            }
        </div>
    );
};

export default TechQuestion;