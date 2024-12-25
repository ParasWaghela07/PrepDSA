import { BrowserRouter as Router, Routes, Route ,useNavigate} from "react-router-dom";

function Question(){
  const navigate=useNavigate();

  async function isLoggedIn() {
        
      try {
          const response = await fetch('http://localhost:4000/isloggedin', {
              method: 'GET',
              headers: {
                  "Content-Type": "application/json"
              },
              credentials: "include"
          });
  
          const res = await response.json();
  
          if (res.success) {
              navigate('/landing');
          }
          else{
            navigate('/home');
          }
      } catch (e) {
          console.log(e);
      }
      
  }
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