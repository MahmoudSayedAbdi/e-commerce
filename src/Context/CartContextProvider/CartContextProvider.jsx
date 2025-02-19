import axios from 'axios';
import React, { createContext, useState } from 'react'

export let CartContext = createContext();

export default function CartContextProvider({children}) {

  const [numCartItem, setNumCartItem] = useState(null);
  const headerOption = {
    headers: {
      token: localStorage.getItem('token'),
    },
  };
  const baseUrl = 'https://ecommerce.routemisr.com/api/v1/cart';




  function getUserCart() {
    return axios.get(baseUrl, headerOption)
  }

  function addUserCart(id) {
    let body = {
      productId: id
    }
    return axios.post(baseUrl, body, headerOption)
  }

  function removeCartItem(id) {
    return axios.delete(`${baseUrl }/${id}`, headerOption)
  }

  function clearCartItem() {
    return axios.delete(baseUrl, headerOption)
  }

  function updateCartItemCount(id,count){
      let body = {
        count : count
      }
    return axios.put(`${baseUrl}/${id}`,body,headerOption)
  }

  return (
    <CartContext.Provider value={{ getUserCart, addUserCart,updateCartItemCount, clearCartItem ,removeCartItem , setNumCartItem ,numCartItem}}>
      {children}
    </CartContext.Provider>
  )
}



































// import axios from 'axios';
// import React, { createContext, useEffect, useState } from 'react';

// export let CartContext = createContext();

// export default function CartContextProvider({ children }) {
//   const [numCartItem, setNumCartItem] = useState(null);
//   const headerOption = {
//     headers: {
//       token: localStorage.getItem('token'),
//     },
//   };
//   const baseUrl = 'https://ecommerce.routemisr.com/api/v1/cart';

//   useEffect(() => {
//     if (localStorage.getItem('token')) {
//       getUserCart().then((req) => {
//         setNumCartItem(req.data.numOfCartItems);
//       }).catch((err) => {
//         console.error(err);
//       });
//     }
//   }, []);

//   const getUserCart = async () => {
//     try {
//       return await axios.get(baseUrl, headerOption);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const addUserCart = async (id) => {
//     const data = {
//       productId: id,
//     };
//     try {
//       return await axios.post(baseUrl, data, headerOption);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const removeCartItem = async (id) => {
//     try {
//       return await axios.delete(`${baseUrl}/${id}`, headerOption);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const clearCartItem = async () => {
//     try {
//       return await axios.delete(baseUrl, headerOption);
//     } catch (err) {
//       console.error(err);
//     }
//   };



//   const updateCartItemCount = async (id, count) => {
//     const data = {
//       count: count,
//     };
//     try {
//       return await axios.put(`${baseUrl}/${id}`, data, headerOption);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <CartContext.Provider value={{ getUserCart, numCartItem, setNumCartItem, addUserCart, removeCartItem, clearCartItem, updateCartItemCount }}>
//       {children}
//     </CartContext.Provider>
//   );
// }


