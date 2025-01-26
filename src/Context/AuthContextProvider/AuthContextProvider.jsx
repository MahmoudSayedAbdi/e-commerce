import React, { Children, createContext, useEffect, useState } from 'react'

export let AuthContext = createContext()


export default function AuthContextProvider({children}) {
    let [token , setToken] =useState(null)

    useEffect(()=>{
      let token = localStorage.getItem("token")
      if(token){
        setToken(token)
      }
    },[])

  return (
    <AuthContext.Provider value={{token, setToken}}>
        {children}
    </AuthContext.Provider>
)
}
