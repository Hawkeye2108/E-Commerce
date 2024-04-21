import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import { CartContextProvider } from './context/cartContext'
import Collection from './pages/Collection'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { useCartContext } from './hooks/useCartContext'
import SingleProduct from './pages/SingleProduct'

function App() {
  const {email} = useCartContext();
  console.log("email in app = ",email);
  
  const router = createBrowserRouter([
    {
      path:"/",
      element:<Home/>
    },
    {
      path:"/collection",
      element:<Collection/>
    },
    {
      path:"/cart",
      element:<Cart/>
    },
    {
      path:"/signup",
      element:!email?<Signup/>:<Navigate to="/collection"/>
    },
    {
      path:"/login",
      element:!email?<Login/>:<Navigate to="/collection"/>
    },
    {
      path:"/singleProduct",
      element: <SingleProduct/>
    }
  ])
  return (
      <RouterProvider router={router}/>
  )
}

export default App
