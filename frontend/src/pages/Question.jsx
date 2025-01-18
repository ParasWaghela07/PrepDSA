import { useContext,useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import {Companies} from "../components/Companies";
import {Links} from "../components/Links";
import {Solutions} from "../components/Solutions";
import {Complexities} from "../components/Complexities";
import {Topics} from "../components/Topics";

function Question(){
   const { isLoggedIn } = useContext(AppContext);
   const {loader,setloader}=useContext(AppContext);
   const qstid=useParams();
  //  console.log(qstid);
   const [question,setquestion]=useState({});
   async function getqstdetail() {
    setloader(true);
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
    setloader(false);
   }

    useEffect(() => {
      isLoggedIn();
      getqstdetail();
    },[]);

    return(
      <div>
        {loader?<p>Loading...</p>:
            <div>
              <h1>{question.question_title}</h1>
              <p>{question.difficulty==1 ? "Easy":question.difficulty==2?"Medium":"Hard"}</p>
              <Companies companies={question.companies}/>
              <Links links={question.redirectLinks}/>
              <Solutions solutions={question.solution_links}/>
              <Complexities complexities={question.time_complexity}/>
              <Topics topics={question.topics}/>
            </div>
        }
      </div>
    )
  }
  export default Question;