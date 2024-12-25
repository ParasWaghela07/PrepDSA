import { useContext,useEffect } from "react";
import { AppContext } from "../context/AppContext";

function Profile(){
   const { isLoggedIn } = useContext(AppContext);

    useEffect(() => {
      isLoggedIn();
    },[]);
    return(
      <div>
          profile
      </div>
    )
  }
  
  export default Profile;