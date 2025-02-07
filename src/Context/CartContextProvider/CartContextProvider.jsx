import axios from 'axios'
import React, { createContext } from 'react'

export let CartContext = createContext()

export default function CartContextProvider( {children}) {

    let headerOption =  {
        headers : {
            token : localStorage.getItem("token"),
        }
    }
    let baseUrl = "https://ecommerce.routemisr.com/api/v1/cart"
    
     function getUserCart(){
        return axios.get(baseUrl , headerOption)
    }

  return (
    <CartContext.Provider value={{getUserCart}} >
        {children}
    </CartContext.Provider>
  )
}
