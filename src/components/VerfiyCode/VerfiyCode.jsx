import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as YUP from "yup"
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {Helmet} from "react-helmet";
import  axios  from 'axios';

export default function VerfiyCode() {
    let [Loading,setLoading]=useState(false)   

    let navigateTo=useNavigate()

    let [errMessage,setErrMessage]=useState("")
  
  async  function handleSendResetCode(values)
    {
        setLoading(true)

      // console.log(values)
  
      let response=await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,values).catch(
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
          navigateTo('/ResetPassword')

        }
      
  
      // console.log(response)
  
    }
  
  
  
  
    let validationSchema=YUP.object({
        resetCode:YUP.string().required("resetCode is required").min(5,"min lenght is 5").max(6,"max lenght is 6"),
    })
  
  
  
  
    let Formik6=useFormik({
      initialValues:{
        resetCode:"",
  
      },
      validationSchema:validationSchema
      ,
      onSubmit:handleSendResetCode
  })
  return <>
  
  <Helmet>
<meta charSet="utf-8" />
<title>Verify Reset Code   </title>
</Helmet>
  
  <div className="container">
    <div className="row">

      <h3>Enter Reset Code :</h3>



      <form onSubmit={Formik6.handleSubmit}>
        

      <input onChange={Formik6.handleChange} onBlur={Formik6.handleBlur} value={Formik6.values.resetCode} type="resetCode" name='resetCode' id='resetCode' placeholder='Enter 6 Digits' className='form-control pb-2'  />
    {Formik6.errors.resetCode&&Formik6.touched.resetCode?<div className='alert alert-danger'>{Formik6.errors.resetCode}</div>:null}

        {errMessage!=""?<p className='alert alert-danger'>{errMessage}</p>:""}


        {Loading==true?<div className='btn btn-outline-success mt-3 text-success'><i className="fas fa-spinner fa-spin"></i></div>
        :
<button type='submit' disabled={!(Formik6.dirty&&Formik6.isValid)} className='btn btn-outline-success mt-3'>Verify Reset Code</button>}


</form>




    </div>
  </div>
  
  </>
  
  

}
