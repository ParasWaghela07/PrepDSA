import { useEffect,useContext } from "react";
import { AppContext } from "../context/AppContext";

function Adminpanel(){
     const { isAdmin } = useContext(AppContext);

    useEffect(()=>{
        isAdmin();
    },[])
    return (
        <div>
            <button>Add question</button>
            <button>Add company</button>
            <button>Add sheet</button>
        </div>
    )
}

export default Adminpanel;