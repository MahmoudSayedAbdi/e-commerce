import React, { Children, useContext } from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoutingProvider({children}) {
  

    let token = localStorage.getItem("token")
    if(token){
        return (
            children
        )
    }else {
        return <Navigate to="/login"></Navigate>
    }
  

}
