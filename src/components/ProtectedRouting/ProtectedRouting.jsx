import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRouting(props) {



    if(localStorage.getItem("shoppingUserToken"))
    {
        return props.children
    }
    else
    {
        return <Navigate to={"/register-login"}/>
    }


  return <>
  
  
  </>
}
