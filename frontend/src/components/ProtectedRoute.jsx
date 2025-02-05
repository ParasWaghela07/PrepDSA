import { Navigate } from 'react-router-dom';
import { toast } from "react-toastify";
import Notfound from '../pages/Notfound';

const ProtectedRoute = ({children}) => {

  const token=JSON.parse(localStorage.getItem('token'));
//   console.log(token);

    if(token?.role === "admin")
        return children
    else
        return <Notfound/>

}

export default ProtectedRoute
