import { useFormik } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import * as YUP from "yup"
import { cartContext } from '../../Context/cartContext'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import {Helmet} from "react-helmet";

export default function PayCash() {

    let {getLoggedUserCart,createCashOrder}=useContext(cartContext)

    let [idFromApiCart,setId]=useState(null)

    async function finalGetLogedCart()
    {
        let response=await getLoggedUserCart()

        setId(response.data.data._id)

    }

    let navigateTo=useNavigate()

    let {setCartNum}=useContext(cartContext)

    let validationSchema=YUP.object({
        details:YUP.string().required("details is required").min(3,"Min length is 5").max(12,"Max length is 20"),
        city:YUP.string().required("city is required").min(3,"Min length is 3").max(12,"Max length is 14"),
        phone:YUP.string().required("Phone is required").matches(/01[0125][0-9]{8}$/,"You shoud enter valid phone")
      })

    async function handlePayOnline(values)
    {
        let response= await createCashOrder(idFromApiCart,values)

        // console.log(response)
        
        if(response?.data?.status=="success")
        {
            toast.success(`You Have Paid Cash ${response?.data?.data?.totalOrderPrice} Pounds `,{duration:4000},{className :"text-center"})

            navigateTo("/allorders")
            setCartNum(0)
        }

    }


    let Formik3=useFormik({
        initialValues:{
            details:"",
            phone:"",
            city:""
        },
        validationSchema:validationSchema
        ,
        onSubmit:handlePayOnline
    })


    useEffect(()=>{

      finalGetLogedCart()

    },[])

  return <>
  
  <Helmet>
<meta charSet="utf-8" />
<title>Pay Cash  </title>
</Helmet>
  <h3 className='mt-2 ms-2 text-center'>Enter Your Data To Pay Cash :</h3>

<div className="container">
    <div className="row">


    <form onSubmit={Formik3.handleSubmit}>

<label htmlFor="details" className="form-label">Details</label>
<input onBlur={Formik3.handleBlur} onChange={Formik3.handleChange} value={Formik3.values.details} type="text"  id="details" name='details' className="form-control" />
{Formik3.errors.details&&Formik3.touched.details? <p className='alert alert-danger'>{Formik3.errors.details}</p>:<></>}



<label htmlFor="phone" className="form-label">Phone</label>
<input onBlur={Formik3.handleBlur} onChange={Formik3.handleChange} value={Formik3.values.phone} type="tel"  id="phone" name='phone' className="form-control" />
{Formik3.errors.phone&&Formik3.touched.phone? <p className='alert alert-danger'>{Formik3.errors.phone}</p>:<></>}



<label htmlFor="details" className="form-label">City</label>
<input onBlur={Formik3.handleBlur} onChange={Formik3.handleChange} value={Formik3.values.city} type="text"  id="city" name='city' className="form-control" />
{Formik3.errors.city&&Formik3.touched.city? <p className='alert alert-danger'>{Formik3.errors.city}</p>:<></>}



<button type='submit' disabled={!(Formik3.dirty&&Formik3.isValid)} className='btn btn-outline-success mt-3'>Pay Cash</button>
</form>


    </div>
</div>

  
  </>

}
