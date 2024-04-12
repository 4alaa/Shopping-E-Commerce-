import React from 'react';
import './App.css';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Products from './components/Products/Products';
import RegisterLogin from './components/Register-Login/Register-Login';
import ErrorPage from './components/ErrorPage/ErrorPage';
import  UserContextProvider  from './Context/userDataContext';
import ProtectedRouting from './components/ProtectedRouting/ProtectedRouting';
import CartContextProvider from './Context/cartContext';
import toast, { Toaster } from 'react-hot-toast';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';
import WishComponent from './components/WishlistComponent/WishComponent';

import AllOrders from './components/AllOrders/AllOrders';
import WishProvider from './Context/wishlistStore';
import PayCash from './components/PayCash/PayCash';
import ProductDetails from './components/ProductDetails/ProductDetails';
import UpdateLogedUserData from './components/Authentication/updateLogedUserData/UpdateLogedUserData';
import UpdateLogedPassWord from './components/Authentication/UpdateLoged Password/UpdateLogedPassWord';
import ForgetPassword from './components/Forget Paasword/ForgetPassword';
import VerfiyCode from './components/VerfiyCode/VerfiyCode';
import ResetPassword from './components/ResetPassword/ResetPassword';
function App() {


  let routers=createHashRouter([

    {path:"",element:<Layout/>,children:[

      {index:true,element:<ProtectedRouting><Home/></ProtectedRouting>},
      {path:"products",element:<ProtectedRouting><Products/></ProtectedRouting>},
      {path:"cart",element:<ProtectedRouting><Cart/></ProtectedRouting>},
      {path:"wishlist",element:<ProtectedRouting><WishComponent/></ProtectedRouting>},
      {path:"Checkout",element:<ProtectedRouting><Checkout/></ProtectedRouting>},
      {path:"paycash",element:<ProtectedRouting><PayCash/></ProtectedRouting>},
      {path:"UpdateLogedUserData",element:<ProtectedRouting><UpdateLogedUserData/></ProtectedRouting>},

      {path:"UpdateLogedUserPassword",element:<ProtectedRouting><UpdateLogedPassWord/></ProtectedRouting>},



      {path:"productdetails/:productId",element:<ProtectedRouting><ProductDetails/></ProtectedRouting>},


      {path:"allorders",element:<ProtectedRouting><AllOrders/></ProtectedRouting>},


      {path:"*",element:<ErrorPage/>},





      // authentication 

      {path:"register-login",element:<RegisterLogin/>},

      {path:"forgotPasswords",element:<ForgetPassword/>},

      {path:"verifycode",element:<VerfiyCode/>},
      {path:"ResetPassword",element:<ResetPassword/>}

      


    ]}
  ])


  return <WishProvider>



<CartContextProvider>
    
    <UserContextProvider>

    <Toaster/>



<RouterProvider  router={routers}>
    </RouterProvider>

  </UserContextProvider>

  </CartContextProvider>




  </WishProvider>



    

  
}

export default App;
