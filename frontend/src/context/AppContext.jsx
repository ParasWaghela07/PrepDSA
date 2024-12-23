import { createContext,useState } from "react";

export const AppContext=createContext();

export default function AppContextProvider({children}){
    const [loader,setloader]=useState(false);
    const [email, setEmail] = useState("");
    const value={
      email,setEmail,loader,setloader
    };

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>;
}