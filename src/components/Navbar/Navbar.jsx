import React, { useContext, useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { userContext } from '../../Context/userDataContext'
import { cartContext } from '../../Context/cartContext'
import { wishlistContext } from '../../Context/wishlistStore'

import logoo from "../../assets/logoo.png"

export default function Navbar() {


  let {setUserData,userData}=useContext(userContext)

  let {cartNum}=useContext(cartContext)

  let {wishNum}=useContext(wishlistContext)




  let navigateTo=useNavigate()

  function logOut() {
    
    localStorage.removeItem("shoppingUserToken")

    setUserData("")
    navigateTo('/register-login')
    
  }




  useEffect(()=>{
  },[])
  return<>
  
  <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to=""><img src={logoo} className='logoo rounded-pill' alt="" /></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">

      {userData?<ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink className="nav-link active" aria-current="page" to=""  style={({ isActive }) => {
    return {
      fontWeight: isActive ? "bold " : "",
      color: isActive ? "text-danger" : "text-toma",

    };
  }}>Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/Products" style={({ isActive }) => {
    return {
      fontWeight: isActive ? "bold " : "",
      color: isActive ? "text-danger" : "text-toma",

    };
  }}>Products</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/allorders" style={({ isActive }) => {
    return {
      fontWeight: isActive ? "bold " : "",
      color: isActive ? "text-danger" : "text-toma",

    };
  }}>All orders</NavLink>
        </li>










        




      </ul>:""}



      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        {userData?<>



          <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          settings
          </a>
          <ul class="dropdown-menu fs-6">
          <li className="nav-item">
          <Link className="nav-link" to="/UpdateLogedUserData" >Update Details</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/UpdateLogedUserPassword" >Update Password</Link>
        </li>
        <li className="nav-item">
        <span className="nav-link logOut"  onClick={()=>{logOut()}}>logOut</span>
      </li>
          </ul>
        </li>

        
          <li className="nav-item">
          <NavLink className="nav-link" to="/cart"><i class="fa-solid fa-basket-shopping fs-4 text-success" ></i> <strong>{cartNum}</strong></NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link" to="/wishlist"><i class="fa-solid fa-heart fs-4 text-danger"></i> <strong>{wishNum}</strong></NavLink>
        </li>




        
        </>:
        // <li className="nav-item">
        //   <NavLink className="nav-link active" aria-current="page" to="register-login">Are you member or not ?</NavLink>
        // </li>
        ""
        }



      </ul>

    </div>
  </div>
</nav>
  </>
}
