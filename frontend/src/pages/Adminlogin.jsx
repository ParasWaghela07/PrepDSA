import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../index.css"
import {toast} from "react-hot-toast";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { AppContext } from "../context/AppContext";
import App from "../App";

function Adminlogin() {
    const navigate = useNavigate();
    const {setloader}=useContext(AppContext);
    const [email,setEmail] = useState("");
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const[eye,setEye] = useState(true);

    const submit = async (e) => {
            e.preventDefault();
            setloader(true);
        try {
            const response = await fetch('http://localhost:4000/adminlogin', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password1: password1,
                    password2:password2
                }),
                credentials: "include"
            });
            const res=await response.json();
            console.log(res);
            if (res.success) {
                toast.success(res.message);
                navigate("/adminpanel", { state: { id: email } });
            } else{
                toast.error(res.message);
            }
        } catch (error) {
            console.error(error);
        }
        setloader(false)
        
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl font-semibold mb-6 text-center">Login</h1>
                <form onSubmit={submit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4 relative">
                        <label className="block text-sm font-medium mb-1" htmlFor="password">Password-1</label>
                        <input
                            id="password"
                            type={eye?"password":"text"}
                            value={password1}
                            onChange={(e) => setPassword1(e.target.value)}

                            placeholder="Password-1"
                            required
                            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        
                        {eye?<IoMdEye className="text-xl absolute right-2 bottom-3" onClick={()=>{
                            setEye(false)
                        }}/>:<IoMdEyeOff className="text-xl absolute right-2 bottom-3" onClick={()=>{
                            setEye(true);
                        }}/>}
                    </div>
                    <div className="mb-4 relative">
                        <label className="block text-sm font-medium mb-1" htmlFor="password">Password-2</label>
                        <input
                            id="password"
                            type={eye?"password":"text"}
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}

                            placeholder="Password-2"
                            required
                            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        
                        {eye?<IoMdEye className="text-xl absolute right-2 bottom-3" onClick={()=>{
                            setEye(false)
                        }}/>:<IoMdEyeOff className="text-xl absolute right-2 bottom-3" onClick={()=>{
                            setEye(true);
                        }}/>}
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600"
                    >
                        Login
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">OR</p>
                    <Link to="/signup" className="text-blue-500 hover:underline">Signup Page</Link>
                </div>
            </div>
        
        </div>
    );
}

export default Adminlogin;