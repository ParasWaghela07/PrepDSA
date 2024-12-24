import './App.css';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from './pages/Landing';
import Profile from './pages/Profile';
import Question from './pages/Question';
import Adminlogin from './pages/Adminlogin';
import Adminpanel from './pages/Adminpanel';
import HomePage from './pages/Homepage';

function App() {
  return (
    <div className="w-screen h-screen">
        <Routes>
          <Route path="/login"   element={<Login/>}/>
          <Route path="/signup"  element={<Signup/>}/>
          <Route path="/landing" element= {<Landing/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="Question" element={<Question/>}/>
          <Route path="/adminlogin" element={<Adminlogin/>}/>
          <Route path="/adminpanel" element={<Adminpanel/>}/>
          <Route path="/home" element={<HomePage/>}></Route>
        </Routes>
    </div>
  );
}

export default App;
