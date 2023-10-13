'use client'

import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "../../../supabase";

const AuthContext = createContext({}) 

export function AuthContextProvider({ children: any }) {
    const [user, setUser] = useState(false);
    const onAuthStateChange = async () => {
        try {
          const {
            data : { user }
          } = await supabase.auth.getUser();
          if (user) {
            setUser(user);
          } 
        } catch (error) {
          console.error(error);
        }
      }
    
    useEffect(() => {
      onAuthStateChange()
    }, []);

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => useContext(AuthContext)