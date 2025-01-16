import { useEffect,useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate, Link } from "react-router-dom";

function Adminpanel(){
    const { isAdmin } = useContext(AppContext);
    const navigate = useNavigate();
    
    useEffect(()=>{
        console.log("adminpanel")
        isAdmin();
    },[])
    return (
        <div>
            <button onClick={(e)=>{
                navigate("/addquestion");
            }}>Add question</button>
            <br />
            <button  onClick={(e)=>{
                navigate("/addsheet");
            }}>Add sheet</button>
        </div>
    )
}

export default Adminpanel;