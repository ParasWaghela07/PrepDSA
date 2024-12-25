import { createContext,useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export const AppContext=createContext();

export default function AppContextProvider({children}){

    const [loader,setloader]=useState(false);
    const [email, setEmail] = useState("");
    const navigate=useNavigate();

    async function isLoggedIn() {
      setloader(true);
      try {
          const response = await fetch('http://localhost:4000/isloggedin', {
              method: 'GET',
              headers: {
                  "Content-Type": "application/json"
              },
              credentials: "include"
          });

          const res = await response.json();

          if (!res.success) {
              navigate('/');
              toast.warn('You need to login first');
          }
      } catch (e) {
          console.log(e);
      }
      setloader(false);
  }

  async function isAdmin() {
    try {
        const response = await fetch('http://localhost:4000/isadminloggedin', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        const res = await response.json();

        if (!res.success) {
            navigate('/');
            toast.info('Proected Route');
        }
    } catch (e) {
        console.log(e);
    }
}

    const value={
      email,setEmail,loader,setloader,isLoggedIn,isAdmin
    };

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>;
}