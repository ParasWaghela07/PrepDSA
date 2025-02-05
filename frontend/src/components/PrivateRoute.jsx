import AppContext from "../context/AppContext"
import { useContext } from "react"
import { Navigate } from 'react-router-dom';
import { toast } from "react-toastify";


const PrivateRoute = ({children}) => {

   const token=JSON.parse(localStorage.getItem('token'));
//    console.log(token);
    if(token?.role === "user" || token?.role === "admin")
        return children
    else
        return toast.warn("You need to login first"),<Navigate to="/login" />

}

export default PrivateRoute
