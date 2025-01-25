import { createContext,useEffect,useState } from "react";
export const AppContext=createContext();

export default function AppContextProvider({children}){
    const [loader,setloader]=useState(false);
    const value={
      loader,setloader
    };

    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>;
}