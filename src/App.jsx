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
import AuthContextProvider from './Context/AuthContextProvider/AuthContextProvider'
import ProtectedRoutingProvider from './Context/ProtectedRouting/ProtectedRoutingProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import NotFound from './Componant/NotFound/NotFound'
import ProdectDetails from './Componant/ProdectDetails/ProdectDetails'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function App() {
  let router = createBrowserRouter([
    {
      path: '', element: <Layout />, children: [
        { index: true, element: <ProtectedRoutingProvider><Home /></ProtectedRoutingProvider> },
        { path: "prodect", element: <ProtectedRoutingProvider><Prodect /> </ProtectedRoutingProvider> },
        { path: "category", element: <ProtectedRoutingProvider><Category /></ProtectedRoutingProvider> },
        { path: "cart", element: <ProtectedRoutingProvider><Cart /></ProtectedRoutingProvider> },
        { path: "brand", element: <ProtectedRoutingProvider><Brand /></ProtectedRoutingProvider> },
        { path: "ProdectDetails/:id", element: <ProtectedRoutingProvider><ProdectDetails /></ProtectedRoutingProvider> },
        { path: "login", element: <Login /> },
        { path: "singUp", element: <SingUp /> },
        { path: "ForgotPassword", element: <ForgotPassword /> },
        { path: "UpdetePassword", element: <UpdetePassword /> },
        { path: "*", element: <NotFound /> },
      ]
    }
  ])


  let client = new QueryClient

  return (
    <>
    

      <QueryClientProvider client={client}>
        <ReactQueryDevtools></ReactQueryDevtools>
        <AuthContextProvider>
          <RouterProvider router={router} />
        </AuthContextProvider>
      </QueryClientProvider>

    </>
  )
}

export default App
