import { ToastContainer } from 'react-toastify';
import { Navigate } from 'react-router-dom';

const OpenRoute = ({children}) => {


    const token=JSON.parse(localStorage.getItem('token'));
//    console.log(token.role);

    if(!token)
        return children
    else if(token.role === "user")
        return <Navigate to="/profile" />
    else 
        return <Navigate to="/adminpanel" />

}

export default OpenRoute
