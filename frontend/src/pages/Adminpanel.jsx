import { useEffect,useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate, Link } from "react-router-dom";

function Adminpanel(){
    const navigate = useNavigate();
    const logout = async () => {
        try {
          const response = await fetch('http://localhost:4000/logout', {
            method: 'GET',
            headers: {
              "Content-Type": "application/json"
            },
            credentials: "include"
          });
          const res = await response.json();
          if (res.success) {
            localStorage.clear();
            window.location.href = '/';
          }
        } catch (e) {
          console.log(e);
        }
      };
    
    return (
        <div>
            <button onClick={(e)=>{
                navigate("/addquestion");
            }}>Add question</button>
            <br />
            <button  onClick={(e)=>{
                navigate("/addsheet");
            }}>Add sheet</button>
            <br/>
            <button  onClick={(e)=>{
                navigate("/addtechquestion");
            }}>Add tech question</button>
            <br/>
            <button  onClick={logout}>Logout</button>
        </div>
    )
}

export default Adminpanel;