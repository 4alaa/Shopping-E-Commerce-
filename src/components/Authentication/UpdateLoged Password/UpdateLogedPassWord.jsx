import React, { useContext, useState } from 'react'
import  axios  from "axios";
import { useFormik } from 'formik';
import * as YUP from "yup"
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
import { userContext } from '../../../Context/userDataContext';
import {Helmet} from "react-helmet";

export default function UpdateLogedPassWord() {


    let headers={

        token:localStorage.getItem("shoppingUserToken")
    }
    
    let navigateTo=useNavigate()
    let {setUserData}=useContext(userContext)

    function logOut() {
    
        localStorage.removeItem("shoppingUserToken")
    
        setUserData("")
        navigateTo('/register-login')
        
      }


      let [errMsg,setErrmsg]=useState("")
    async function handleUpdateLOgedUserData(values)
    {

        let response=await  axios.put(`https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`,values,{headers:headers}).catch(
            (err)=>{


                // console.log(`${err.response.data.errors.msg}  (${err.response.data.errors.value})`)

                setErrmsg(`${err.response.data.errors.msg}  (${err.response.data.errors.value})`)

            }
        )



        if(response.data.message=="success")
        {

            toast.success("Your Data Is Updated",{duration:5000})
            logOut()
        }



 
        
    }

    let validationSchema=YUP.object({
        currentPassword:YUP.string().required("currentPassword is required").matches(/^.{6,}$/,"Password should be any 6 inputs or more"),
        password:YUP.string().required("Password is required").matches(/^.{6,}$/,"Password should be any 6 inputs or more"),
        rePassword:YUP.string().required("rePassword is required").oneOf([YUP.ref("password")],"Password and rePassword dont match"),
      })

    let formik=useFormik({
        initialValues:{
            currentPassword: "",
            password:"",
            rePassword:'',
        },
        validationSchema:validationSchema,

        onSubmit:handleUpdateLOgedUserData
    })


  return<>
                <Helmet>
                <meta charSet="utf-8" />
                <title>Update Password</title>
            </Helmet>
  
  <h3 className='mt-2 ms-2 text-center'>Update Your Password </h3>

<div className="container">
    <div className="row">


    <form onSubmit={formik.handleSubmit}>

    <label htmlFor="currentPassword" className="form-label">current Password</label>
    <input value={formik.values.currentPassword} onBlur={formik.handleBlur} onChange={formik.handleChange} type="password"  id="currentPassword" name='currentPassword' className="form-control"/>
    {formik.errors.currentPassword&&formik.touched.currentPassword? <p className='alert alert-danger'>{formik.errors.currentPassword}</p>:<></>}


    <label htmlFor="newpassword" className="form-label">new  Password</label>
    <input value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} type="password"  id="newpassword" name='password' className="form-control"/>
    {formik.errors.password&&formik.touched.password? <p className='alert alert-danger'>{formik.errors.password}</p>:<></>}


    <label htmlFor="rePassword" className="form-label">Verify New Password</label>
    <input value={formik.values.rePassword} onBlur={formik.handleBlur} onChange={formik.handleChange} type="password"  id="rePassword" name='rePassword' className="form-control"/>
    {formik.errors.rePassword&&formik.touched.rePassword? <p className='alert alert-danger'>{formik.errors.rePassword}</p>:<></>}

<button type='submit' disabled={!(formik.dirty&&formik.isValid)} className='btn btn-outline-success mt-3'>Update Password </button>

{errMsg!=""?<p className='alert alert-danger'>{errMsg}</p>:""}
</form>


    </div>
</div>
  
  
  </>
}
