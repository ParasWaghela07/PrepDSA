import { Navigate } from 'react-router-dom';
import { toast } from "react-toastify";

const ProtectedRoute = ({children}) => {

  const token=JSON.parse(localStorage.getItem('token'));
//   console.log(token);

    if(token?.role === "admin")
        return children
    else
        return toast.error("Only admins can access this feature"),<Navigate to="/" />

}

export default ProtectedRoute
