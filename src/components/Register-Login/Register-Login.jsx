import  axios  from 'axios';
import { useFormik } from 'formik';
import React, {  useContext, useState } from 'react'
import {useNavigate} from "react-router-dom"
import {Helmet} from "react-helmet";

import { Link } from 'react-router-dom';


import * as YUP from "yup"
import { userContext } from '../../Context/userDataContext';

export default function RegisterLogin() {




  let [Loading,setLoading]=useState(false)   


  let {launch_toast}=useContext(userContext)





  let navigate=useNavigate()


  function signUpMode()
  {
    document.querySelector(".container").classList.add("sign-up-mode");

  }
  
  function RemovesignUpMode()
  {
    document.querySelector(".container").classList.remove("sign-up-mode");

  }



  let validationSchema=YUP.object({
    name:YUP.string().required("Name is required").min(3,"Min length is 3").max(12,"Max length is 12"),
    email:YUP.string().required("Email is required").email("You should enter valid email"),
    password:YUP.string().required("Password is required").matches(/^.{6,}$/,"Password should be any 6 inputs or more"),
    rePassword:YUP.string().required("rePassword is required").oneOf([YUP.ref("password")],"Password and rePassword dont match"),
    phone:YUP.string().required("Phone is required").matches(/01[0125][0-9]{8}$/,"You shoud enter valid phone")
  })


  async function handleRegister(values)
  {

    setLoading(true)
    let {data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values).catch((err)=>
    {
      setLoading(false)

      return <>
      
      {  launch_toast(`<i class="fa-solid fa-heart-crack"></i>`,err.response.data.message)
}
      </>
    }


)





    if(data.message=="success")
    {
      setLoading(false)

      RemovesignUpMode()
        launch_toast(`<i class="fa-solid fa-face-smile-beam"></i>`,`You registet Successfully`)


    }

  }


  let Formik=useFormik({

    initialValues:{
        name: "",
        email:"",
        password:'',
        rePassword:"",
        phone:""
      },

      validationSchema,

      onSubmit:handleRegister


  })


  async function handleLogin(values)
  {

    setLoading(true)

    let {data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values).catch((err)=>
    {
      setLoading(false)

      return <>
      
      {      launch_toast(`<i class="fa-solid fa-heart-crack"></i>`,err.response.data.message)

}
      </>
    }
  )
    
    
    
    
    
    






  // get data from context




  if(data.message=="success")
  {

    setLoading(false)

    localStorage.setItem("shoppingUserToken",data.token)

    navigate("/")


    window.location.reload(); 

    

  }
  }


  
  let validationSchema2=YUP.object({

    email:YUP.string().required("Email is required").email("You should enter valid email"),
    password:YUP.string().required("Password is required").matches(/^.{6,}$/,"Password should be any 6 inputs or more")
  })

  let formik2=useFormik({

    initialValues:{
      email:"",
      password:""
    },

    validationSchema:validationSchema2,

    onSubmit:handleLogin

  })


  // show pass in login 
  var inPassword=document.querySelector('.loginpassword')
  var myIcon_2 = document.getElementById('icon-2');

   function showPassInLogin () {
  
  
  
    if (myIcon_2.classList.contains('fa-eye')) {
  
      myIcon_2.classList.toggle('fa-eye-slash');
      myIcon_2.classList.toggle('fa-eye');
  
      inPassword.setAttribute('type', 'text');
  
  
  
    } else {
  
  
      inPassword.setAttribute('type', 'password');
  
      myIcon_2.classList.toggle('fa-eye');
      myIcon_2.classList.toggle('fa-eye-slash');
  
    };
  }


  // show password in register
  
  var registerPass=document.querySelector('.registerPass')
  var myIcon = document.getElementById('icon');

  function showregisterLogin () {
  
  
  
    if (myIcon.classList.contains('fa-eye')) {
  
      myIcon.classList.toggle('fa-eye-slash');
      myIcon.classList.toggle('fa-eye');
  
      registerPass.setAttribute('type', 'text');
  
  
  
    } else {
  
  
      registerPass.setAttribute('type', 'password');
  
      myIcon.classList.toggle('fa-eye');
      myIcon.classList.toggle('fa-eye-slash');
  
    };
  }

  return <>

<Helmet>
<meta charSet="utf-8" />
<title>Register-Login  </title>
</Helmet>


  <div id="toast"><div id="img"></div><div id="desc">email alreay exist</div></div>
  
      <div className="container signandlogin sign-up-mode">
      <div className="forms-container">
        <div className="signin-signup">
          <form onSubmit={formik2.handleSubmit} action="#" className="form sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <label htmlFor="email" className="form-label">User email</label>
              <input onBlur={formik2.handleBlur} onChange={formik2.handleChange} value={formik2.values.email} type="email"  id="email" name='email' className="form-control" />
              {formik2.errors.email&&formik2.touched.email?<div className='alert alert-danger'>{formik2.errors.email}</div>:""}
            </div>
            <div className="input-field">
              <label htmlFor="Password" className="form-label">User Password</label>
              <input onBlur={formik2.handleBlur} onChange={formik2.handleChange} value={formik2.values.password} type="password"  id="password" name='password' className="loginpassword form-control"/>
              {formik2.errors.password&&formik2.touched.password?<div className='alert alert-danger'>{formik2.errors.password}</div>:""}

              <p className="d-flex align-items-center gap-2 "   onClick={()=>{
                  showPassInLogin()
                }}>
                <i id="icon-2"className="far fa-eye fa-lg"></i>
                <p className="mt-3 pointer">show Password</p>
              </p>


              <Link to="/forgotPasswords" className='text-decoration-none text-muted position-relative start-50 translate-middle-x '>Forgot My Password</Link>

            </div>
            {Loading==true?<div className='btn btn-outline-success mt-3 text-success fs-3 text-white'><i className="fas fa-spinner fa-spin"></i></div>
            :
            <input disabled={!(formik2.dirty&&formik2.isValid)} type="submit" value="Login" className="btn solid" id="signInBtn"/>
          }
            <p className="social-text">Or Sign in with social platforms</p>
            <div className="social-media">
              <a href="#facebook" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#twitter" className="social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#google" className="social-icon">
                <i className="fab fa-google"></i>
              </a>
              <a href="#linkedin" className="social-icon">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </form>
          {/* Register page */}
          <form action="#" className="form sign-up-form" onSubmit={Formik.handleSubmit}>
            <h2 className="title">Sign up</h2>
            <div className="allInputs">

            </div>
            <div className="input-field">
              <label htmlFor="name" className="form-label">User name</label>
              <input onBlur={Formik.handleBlur} type="text" value={Formik.values.name}  onChange={Formik.handleChange} id="name" name='name' className="form-control" />
              {Formik.errors.name&&Formik.touched.name? <p className='alert alert-danger'>{Formik.errors.name}</p>:<></>}
            </div>
            <p className="bg-danger rounded-pill nameAlert d-none">Name exist, please enter another one</p>
            <div className="input-field">
              <label htmlFor="email" className="form-label">User email</label>
              <input value={Formik.values.email} onBlur={Formik.handleBlur} onChange={Formik.handleChange} type="email"  id="email" name='email' className="form-control" />
              {Formik.errors.email&&Formik.touched.email? <p className='alert alert-danger'>{Formik.errors.email}</p>:<></>}

            </div>
            <p className="bg-danger rounded-pill EmailAlert d-none">Email exist, please enter another one</p>

            <div className="input-field">
              <label htmlFor="password" className="form-label">User password</label>
              <input value={Formik.values.password} onBlur={Formik.handleBlur} onChange={Formik.handleChange} type="password"  id="password" name='password' className="registerPass form-control"/>
              {Formik.errors.password&&Formik.touched.password? <p className='alert alert-danger'>{Formik.errors.password}</p>:<></>}

              <p  className="d-flex align-items-center gap-2 " onClick={()=>{
                  showregisterLogin()
                }}>
                <i id="icon" className="far fa-eye"></i>
                <p className="mt-3 pointer" >show Password</p>
              </p>
            </div>
            <div className="input-field">
              <label htmlFor="rePassword" className="form-label">Re password</label>
              <input value={Formik.values.rePassword} onBlur={Formik.handleBlur} onChange={Formik.handleChange} type="password" name='rePassword' id="rePassword" className="form-control"/>
              {Formik.errors.rePassword&&Formik.touched.rePassword? <p className='alert alert-danger'>{Formik.errors.rePassword}</p>:<></>}

            </div>
            <div className="input-field">
              <label htmlFor="phone" className="form-label">User Phone</label>
              <input value={Formik.values.phone} onBlur={Formik.handleBlur} onChange={Formik.handleChange} type="tel" name='phone' id="phone" className="form-control" />
              {Formik.errors.phone&&Formik.touched.phone? <p className='alert alert-danger'>{Formik.errors.phone}</p>:<></>}

            </div>

            {Loading==true?<div className='btn btn-outline-success mt-3 text-success fs-3 text-white'><i className="fas fa-spinner fa-spin"></i></div>
            :
            <input  disabled={ !(Formik.dirty && Formik.isValid)}  type="submit" className="btn" value="Sign up" id="SignUpBtn" />
              }
            <div id="snackbar">You Regiser Successfully <i className="fa-solid fa-heart ms-2 text-danger"></i></div> 
            <p className="social-text">Or Sign up with social platforms</p>
            <div className="social-media">
              <a href="#" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-google"></i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>
            <p>
              if you dont have acount you should go to  sign up page 
              first to register
              </p>
            <button className="btn transparent" id="sign-up-btn" onClick={()=>{signUpMode()}}>
              Sign up
            </button>
          </div>
          <img src="img/undraw_secure_login_pdn4.svg" className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <p>
              if you sign up successfully you should go to  sign in page to enter our page              
            </p>
            <button className="btn transparent" id="sign-in-btn"  onClick={()=>{RemovesignUpMode()}}>
              Sign in
            </button>
          </div>
          <img src="img/undraw_my_app_re_gxtj.svg" className="image" alt="" />
        </div>
      </div>
    </div>
  
  
  </>
}
