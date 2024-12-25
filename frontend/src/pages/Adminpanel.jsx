import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Adminpanel(){
    const navigate= useNavigate();
    async function isLoggedIn() {
        
        try {
            const response = await fetch('http://localhost:4000/isadminloggedin', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
  
            const res = await response.json();
  
            if (!res.success) {
                navigate('/home');
            }
            else{
              navigate('/adminpanel');
            }
        } catch (e) {
            console.log(e);
        }
        
    }
    useEffect(()=>{
        isLoggedIn()
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