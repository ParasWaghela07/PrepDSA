import './App.css';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Landing from './pages/Landing';
import Profile from './pages/Profile';
import Question from './pages/Question';
import Adminlogin from './pages/Adminlogin';
import Adminpanel from './pages/Adminpanel';
import HomePage from './pages/Homepage';
import NotFound from './pages/Notfound';
import { useContext, useEffect, useState } from 'react';
import Addquestion from './pages/Addquestion';
import Sendmail from './pages/Sendmail';
import UpdatePassword from './pages/Updatepassword';
import Loader from './components/Loader';
import { AppContext } from './context/AppContext';
import Addsheet from './pages/Addsheet';
import UpdateProfile from './pages/UpdateProfile';
import ChangePassword from './pages/Changepassword';
import Sendmail2 from './pages/Sendmail2';
import Spectopic from './pages/Spectopic';
import PrivateRoute from './components/PrivateRoute';
import OpenRoute from './components/OpenRoute';
import ProtectedRoute from './components/ProtectedRoute';
import { Sidebar } from './components/Sidebar';
import AptiLanding from './pages/aptiLanding';
import AptiQuestionDetail from './pages/AptiQuestionDetail';
import AptiQuiz from './pages/AptiQuiz';
import Sheetdisplay from './pages/Sheetdisplay';
import TechLanding from './pages/TechLanding';
import TechQuestion from './pages/TechQuestion';
import AddTag from './pages/Addtag';
import Addtechquestion from './pages/Addtechquestion';
function App() {
  const [allquestions, setallquestions] = useState([]);
  const [allcompanies, setallcompanies] = useState([]);
  const [alltopics, setalltopics] = useState([]);
  const { loader, user, setuser } = useContext(AppContext)
  const location = useLocation();

  async function getallquestions() {
    try {
      const response = await fetch("http://localhost:4000/getallquestions");
      const data = await response.json();
      // console.log(data);
      setallquestions(data.data);
    }
    catch (error) {
      console.error("Error fetching questions:", error);
    }
  }

  async function getallcompanies() {
    try {
      const response = await fetch("http://localhost:4000/getallcompanies");
      const data = await response.json();
      // console.log(data);
      setallcompanies(data.data);
    }
    catch (error) {
      console.error("Error fetching companies:", error);
    }
  }

  async function getalltopics() {
    try {
      const response = await fetch("http://localhost:4000/getalltopics");
      const data = await response.json();
      // console.log(data);
      setalltopics(data.data);
    }
    catch (error) {
      console.error("Error fetching topics:", error);
    }
  }

  async function getUserDetail() {
    try {
      const response = await fetch("http://localhost:4000/getuserdetail", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await response.json();
      // console.log(data);
      if (data.data) {
        setuser(data.data);
      }
    }
    catch (error) {
      console.error("Error fetching user:", error);
    }
  }

  const token = JSON.parse(localStorage.getItem('token'));

  useEffect(() => {
    getallquestions();
    getallcompanies();
    getalltopics();
  }, []);

  useEffect(() => {
    getUserDetail();
  }, [location.pathname]);

  return (
    <div className="w-screen h-screen flex">
      {token && <Sidebar />}
      <div className='w-full h-full overflow-y-auto'>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/landing" element={<PrivateRoute><Landing allquestions={allquestions} allcompanies={allcompanies} alltopics={alltopics} /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/Question/:qstid" element={<PrivateRoute><Question /></PrivateRoute>} />
          <Route path="/adminlogin" element={<Adminlogin />} />
          <Route path="/adminpanel" element={<ProtectedRoute><Adminpanel /></ProtectedRoute>} />
          <Route path="/addquestion" element={<ProtectedRoute><Addquestion allcompanies={allcompanies} allquestions={allquestions} alltopics={alltopics} /></ProtectedRoute>} />
          <Route path="/" element={<OpenRoute><HomePage /></OpenRoute>} />
          <Route path="/sendmail" element={<Sendmail />} />
          <Route path="/sendmail2" element={<PrivateRoute><Sendmail2 /></PrivateRoute>} />
          <Route path="/update-password/:token" element={<UpdatePassword />} />
          <Route path="/addsheet" element={<ProtectedRoute><Addsheet allquestions={allquestions} allcompanies={allcompanies} alltopics={alltopics} /></ProtectedRoute>} />
          <Route path="/changeProfile" element={<PrivateRoute><UpdateProfile /></PrivateRoute>} />
          <Route path="/changepassword" element={<PrivateRoute><ChangePassword /></PrivateRoute>} />
          <Route path="*" element={<NotFound />} />
          <Route path="/topic/:topicid" element={<PrivateRoute><Spectopic /></PrivateRoute>}></Route>
          <Route path="/aptitude" element={<PrivateRoute><AptiLanding /></PrivateRoute>}></Route>
          <Route path="/aptitude/question/:id" element={<PrivateRoute><AptiQuestionDetail /></PrivateRoute>} />
          <Route path="/aptiquiz" element={<PrivateRoute><AptiQuiz /></PrivateRoute>} />
          <Route path="/displaysheet" element={<Sheetdisplay />} />
          <Route path="/techlanding" element={<PrivateRoute><TechLanding /></PrivateRoute>} />
          <Route path="/techquestion/:qstid" element={<PrivateRoute><TechQuestion /></PrivateRoute>} />
          <Route path="/addtag" element={<ProtectedRoute><AddTag /></ProtectedRoute>} />
          <Route path="/addtechquestion" element={<ProtectedRoute><Addtechquestion /></ProtectedRoute>} />
        </Routes>
      </div>

      {loader && <div className="fixed top-0 right-0 left-0  flex justify-center items-center h-full bg-black bg-opacity-50 z-50"><Loader /></div>}
    </div>
  );
}

export default App;
