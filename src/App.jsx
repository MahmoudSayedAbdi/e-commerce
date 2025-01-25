import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Componant/Home/Home'
import SingUp from './Componant/SingUp/SingUp'
import Prodect from './Componant/Prodect/Prodect'
import Login from './Componant/Login/Login'
import Layout from './Componant/Layout/Layout'
import Cart from './Componant/Cart/Cart'
import Category from './Componant/Category/Category'
import Brand from './Componant/Brand/Brand'
import ForgotPassword from './Componant/ForgotPassword/ForgotPassword'
import UpdetePassword from './Componant/ForgotPassword/UpdetePassword'

function App() {
  let router = createBrowserRouter([
    {path : '' , element : <Layout /> , children : [
      {index : true , element:<Home /> },
      {path: "singUp" , element: <SingUp />  },
      {path: "login" , element: <Login />  },
      {path: "ForgotPassword" , element: <ForgotPassword />  },
      {path: "UpdetePassword" , element: <UpdetePassword />  },
      {path: "prodect" , element: <Prodect />  },
      {path: "cart" , element: <Cart />  },
      {path: "category" , element: <Category />  },
      {path: "brand" , element: <Brand />  },
    ]}
  ])

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
