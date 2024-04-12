import React, { useContext } from 'react'
import  axios  from "axios";
import { useFormik } from 'formik';
import * as YUP from "yup"
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
import { userContext } from '../../../Context/userDataContext';
import {Helmet} from "react-helmet";


export default function UpdateLogedUserData() {




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
    async function handleUpdateLOgedUserData(values)
    {

        let response=await  axios.put(`https://ecommerce.routemisr.com/api/v1/users/updateMe/`,values,{headers:headers})

        // console.log(response)
        if(response.data.message=="success")
        {

            toast.success("Your Data Is Updated",{duration:5000})
            logOut()
        }
        
    }

    let validationSchema=YUP.object({
        name:YUP.string().required("Name is required").min(3,"Min length is 3").max(12,"Max length is 12"),
        email:YUP.string().required("Email is required").email("You should enter valid email"),
        phone:YUP.string().required("Phone is required").matches(/01[0125][0-9]{8}$/,"You shoud enter valid phone")
      })

    let formik=useFormik({
        initialValues:{
            name: "",
            email:"",
            password:'',
        },
        validationSchema:validationSchema,

        onSubmit:handleUpdateLOgedUserData
    })
    
  return <>
  
  <Helmet>
                <meta charSet="utf-8" />
                <title>Update Information  </title>
            </Helmet>
  
  <h3 className='mt-2 ms-2 text-center'>Update information about me </h3>

<div className="container">
    <div className="row">


    <form onSubmit={formik.handleSubmit}>

<label htmlFor="name" className="form-label">Name</label>
<input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} type="text"  id="name" name='name' className="form-control" />
{formik.errors.name&&formik.touched.name? <p className='alert alert-danger'>{formik.errors.name}</p>:<></>}


<label htmlFor="email" className="form-label">Email</label>
<input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email"  id="email" name='email' className="form-control" />
{formik.errors.email&&formik.touched.email? <p className='alert alert-danger'>{formik.errors.email}</p>:<></>}


<label htmlFor="phone" className="form-label">Phone</label>
<input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel"  id="phone" name='phone' className="form-control" />
{formik.errors.phone&&formik.touched.phone? <p className='alert alert-danger'>{formik.errors.phone}</p>:<></>}

<button type='submit' disabled={!(formik.dirty&&formik.isValid)} className='btn btn-outline-success mt-3'>Update All My Data </button>
</form>


    </div>
</div>
  
  
  </>
}
