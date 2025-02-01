import { createContext,useEffect,useState } from "react";
export const AppContext=createContext();

export default function AppContextProvider({children}){
    const [loader,setloader]=useState(false);
    const [user,setuser]=useState({});
    const value={
      loader,setloader,user,setuser
    };

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>;
}