import { useContext,useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";

function Question(){
   const { isLoggedIn } = useContext(AppContext);
   const qstid=useParams();
   console.log(qstid);
   const [question,setquestion]=useState({});
   async function getqstdetail() {
    try{
      const response=await fetch('http://localhost:4000/getquestiondetail',{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            qstid:qstid.qstid
        }),
        credentials: "include",
      })

      const data=await response.json();
      console.log(data);
      if(data.success){
        setquestion(data.data);
      }
    }
    catch(error){
      console.error("Error fetching question:", error);
    }
   }

    useEffect(() => {
      isLoggedIn();
      getqstdetail();
    },[]);

    return(
      <div>
          Question
      </div>
    )
  }
  export default Question;