import { useContext,useEffect } from "react";
import { AppContext } from "../context/AppContext";

function Question(){
   const { isLoggedIn } = useContext(AppContext);

    useEffect(() => {
      isLoggedIn();
    },[]);

    return(
      <div>
          Question
      </div>
    )
  }
  export default Question;