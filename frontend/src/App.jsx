import './App.css';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { BrowserRouter as Router, Routes, Route ,useNavigate} from "react-router-dom";
import Landing from './pages/Landing';
import Profile from './pages/Profile';
import Question from './pages/Question';
import Adminlogin from './pages/Adminlogin';
import Adminpanel from './pages/Adminpanel';
import HomePage from './pages/Homepage';
import { useEffect ,useState} from 'react';
import { use } from 'react';

function App() {
    const [allquestions,setallquestions] = useState([]);
    const [allcompanies,setallcompanies] = useState([]);
    const [alltopics,setalltopics] = useState([]);
    const navigate=useNavigate();







  
    async function getallquestions() {
      try{
        const response = await fetch("http://localhost:4000/getallquestions");
        const data = await response.json();
        console.log(data);
        setallquestions(data.data);
      }
      catch(error){
        console.error("Error fetching questions:", error);
      }
    }

    async function getallcompanies() {
      try{
        const response = await fetch("http://localhost:4000/getallcompanies");
        const data = await response.json();
        console.log(data);
        setallcompanies(data.data);
      }
      catch(error){
        console.error("Error fetching companies:", error);
      }
    }

    async function getalltopics() {
      try{
        const response = await fetch("http://localhost:4000/getalltopics");
        const data = await response.json();
        console.log(data);
        setalltopics(data.data);
      }
      catch(error){
        console.error("Error fetching topics:", error);
      }
    }

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
    getallquestions();
    getallcompanies();
    getalltopics();
    isLoggedIn();
  },[]);

  return (
    <div className="w-screen h-screen">
        <Routes>
          <Route path="/login"   element={<Login/>}/>
          <Route path="/signup"  element={<Signup/>}/>
          <Route path="/landing" element= {<Landing allquestions={allquestions} allcompanies={allcompanies} alltopics={alltopics}/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/Question" element={<Question/>}/>
          <Route path="/adminlogin" element={<Adminlogin/>}/>
          <Route path="/adminpanel" element={<Adminpanel/>}/>
          <Route path="/home" element={<HomePage/>}></Route>
        </Routes>
    </div>
  );
}

export default App;
