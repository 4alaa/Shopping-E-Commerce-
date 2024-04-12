import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as YUP from "yup"
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {Helmet} from "react-helmet";
import  axios  from 'axios';

export default function ForgetPassword() {

  let [Loading,setLoading]=useState(false)   

  let navigateTo=useNavigate()

  let [errMessage,setErrMessage]=useState("")

async  function handleSendResetCode(values)
  {
    // console.log(values)

    setLoading(true)

    let response=await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,values).catch(
      (err)=>{
        setLoading(false)

        return <>
        {/* {console.log(err.response.data.message)} */}
        {setErrMessage(err?.response?.data?.message)}
        </>
      })


      if(response?.data?.statusMsg=="success")
      {
        setLoading(false)

        toast.success(response.data.message,{duration:4000,className :"text-danger"})
        
        navigateTo("/verifycode")
      }
    

    // console.log(response)

  }




  let validationSchema=YUP.object({
    email:YUP.string().required("Email is required").email("You should enter valid email"),
  })




  let Formik4=useFormik({
    initialValues:{
      email:"",

    },
    validationSchema:validationSchema
    ,
    onSubmit:handleSendResetCode
})
  return<>

<Helmet>
<meta charSet="utf-8" />
<title>Forget Password   </title>
</Helmet>
  
  <div className="container">
    <div className="row">

      <h3>Enter your email to send reset code :</h3>



      <form onSubmit={Formik4.handleSubmit}>

      <label htmlFor="email" className="form-label">User email</label>
        <input onBlur={Formik4.handleBlur} onChange={Formik4.handleChange} value={Formik4.values.email} type="email"  id="email" name='email' className="form-control" />
        {Formik4.errors.email&&Formik4.touched.email?<div className='alert alert-danger'>{Formik4.errors.email}</div>:""}

        {errMessage!=""?<p className='alert alert-danger'>{errMessage}</p>:""}

        {Loading==true?<div className='btn btn-outline-success mt-3 text-success'><i className="fas fa-spinner fa-spin"></i></div>
        :
<button type='submit' disabled={!(Formik4.dirty&&Formik4.isValid)} className='btn btn-outline-success mt-3'>Send Code</button>}


</form>




    </div>
  </div>
  
  </>
}
