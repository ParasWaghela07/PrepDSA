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
import { useContext, useEffect ,useState} from 'react';
import Addquestion from './pages/Addquestion';
import Sendmail from './pages/Sendmail';
import UpdatePassword from './pages/Updatepassword';
import Loader from './components/Loader';
import { AppContext } from './context/AppContext';

function App() {
    const [allquestions,setallquestions] = useState([]);
    const [allcompanies,setallcompanies] = useState([]);
    const [alltopics,setalltopics] = useState([]);
    const navigate=useNavigate();
    const {loader}=useContext(AppContext)







  
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
  

  useEffect(() => {
    getallquestions();
    getallcompanies();
    getalltopics();
  //  isLoggedIn();
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
          <Route path="/addquestion" element={<Addquestion allcompanies={allcompanies} allquestions={allquestions} alltopics={alltopics}/>}/>
          <Route path="/home" element={<HomePage/>}/>
          <Route path="/sendmail" element={<Sendmail/>}/>
          <Route path="/update-password/:token" element={<UpdatePassword/>}/>
        </Routes>

        {loader && <div className="fixed top-0 right-0 left-0  flex justify-center items-center h-full bg-black bg-opacity-50 z-50"><Loader/></div>}
    </div>
  );
}

export default App;
