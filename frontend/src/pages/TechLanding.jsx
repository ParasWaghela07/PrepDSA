import React, { useEffect, useState } from 'react';
import TechQst from '../components/TechQst';
import toast from 'react-hot-toast';
const TechLanding = () => {
    const [techquestion,settechquestion]=useState();

    async function getAllTechQuestions(){
        const toastid=toast.loading('Loading...');
        try {
            const response = await fetch("http://localhost:4000/getAllTechQuestions");
            const data = await response.json();
            console.log(data);
            settechquestion(data.data);
          }
          catch (error) {
            console.error("Error fetching questions:", error);
          }
          toast.dismiss(toastid);
    }

    useEffect(()=>{
        getAllTechQuestions();
    },[])
    return (
        <div>
            {techquestion?.length>0 ?(
                techquestion?.map((qst,index)=>{
                    return <TechQst question={qst} key={index}/>
                })
            ):(<p>No Questions Found</p>)}
        </div>
    );
};

export default TechLanding;