import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../../Context/cartContext'
import { userContext } from '../../Context/userDataContext'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import {Helmet} from "react-helmet";




export default function Cart() {
    let [PutloderSpinner,isLoading]=useState(false)


    let {saveUserData,userData}=useContext(userContext)

    let {getLoggedUserCart,removeCartItem,updateCountOfProduct,clearCart,setCartNum}=useContext(cartContext)


    let [userCart,SetUserCart]=useState([])

    async function finalGetLogedCart()
    {
        isLoading(true)
        let response=await getLoggedUserCart()

        // console.log(response.data)


        if(response?.data?.status=="success")
        {
            SetUserCart(response.data.data)
            // console.log(response.data.data)
            setCartNum(response.data.numOfCartItems)


        }

        isLoading(false)

    }

    async function FinalremoveCartItem(productId)
    {
        let response=await removeCartItem(productId)

        // console.log(response)

        if(response?.data?.status=="success")
        {
            toast.success("Product Removed Successfully")
            SetUserCart(response.data.data)

            // console.log(response.data.numOfCartItems)

            setCartNum(response.data.numOfCartItems)

            

        }

    }

    

    async function FinalUpdateCountOfProduct(productId,count)
    {
        let response=await updateCountOfProduct(productId,count)

        if(response?.data?.status=="success")
        {
      
            toast.success("Product count updated ")
            SetUserCart(response.data.data)

        }

    }

   
    async function removeAll()
    {
        let response=await clearCart()

        // console.log(response)

        if(response.data.message=="success")
        {
            toast.success("You Have  Cleared The Data")
            
            SetUserCart([])

            setCartNum(0)



        }
    }





 



    function  sure() {
        document.querySelector(".buttons").classList.toggle("d-none")
      }



    useEffect(()=>{
        saveUserData()
        finalGetLogedCart()
    },[])

  return <>
  <Helmet>
<meta charSet="utf-8" />
<title>My Cart  </title>
</Helmet>

{PutloderSpinner==true?<div className='d-flex justify-content-center align-items-center mt-5'>

<span class="loader"></span>


</div>
:


<>

{userCart.length!=[]?
<>
<h3 className='mt-2 text-center'>Shop cart ( {userData?.name}  )</h3>
  

  <div className="container">
      <div className="row">

      <h5 className='text-center'>Total cart price : {userCart?.totalCartPrice} <span className='text-success'>EGP</span></h5>


      {/* <button className='btn btn-outline-danger text-capitalize w-25 mx-auto my-3' onClick={()=>{removeAll()}}>Remove all products</button> */}

      <button className="btn btn-outline-danger mt-4 ms-2  w-25 mx-auto position-relative start-50 translate-middle-x  "onClick={()=>{sure()}} id="deleteAllProducts"><i className="fa-solid fa-dumpster me-2"></i>Delete All <span id="numProducts"></span></button>
       <br />
        <div className="buttons mx-auto mt-3 d-none">
            <button onClick={()=>{removeAll()}}>Yes</button>
            <button onClick={()=>{sure()}}>No</button>
          </div>

      <div className="container">
        <div className="row g-4">

<br />
<hr />
        {userCart?.products?.map((el)=>< >
        
        <div className="col-md-1 ">
            <img src={el.product.imageCover} className='w-100' alt="" />
        </div>
        <div className="col-md-11 d-flex justify-content-between">
        
        <div className="aboutProduct">
        <p> <span>{el?.product?.title}</span>( <span className='text-success'>{el?.product?.category?.name}</span> )</p>
        <p>price : {el?.price} <span className='text-success'>EGP</span></p>

        <button className='btn btn-outline-danger' onClick={()=>{
            FinalremoveCartItem(el.product._id)
        }}><i className="fa-solid fa-trash me-2"></i>Remove Product From My Cart</button>
        </div>
  



        <div className="Count">
            <button className='btn btn-outline-success' onClick={()=>{
                FinalUpdateCountOfProduct(el.product._id,el.count+1)
            }}>++</button>
            <span className='mx-4'>{el?.count}</span>
            <button className='btn btn-outline-success' onClick={()=>{
                FinalUpdateCountOfProduct(el.product._id,el.count!=0?el.count-1:0)
            }}>--</button>

        </div>
        


        
        </div>
        <hr />

        </>)}


        <Link className='btn btn-outline-primary my-4 mx-auto w-25 d-flex align-items-center justify-content-center' to="/paycash"><i class="fa-solid fa-money-bill-wave  me-3 text-success fs-5"></i>Pay cash</Link>


        <Link className='btn btn-outline-secondary my-4 mx-auto w-25 d-flex align-items-center justify-content-center' to="/Checkout"><i class="fa-solid fa-credit-card me-3 text-warning fs-5"></i>Pay online</Link>




        </div>
      </div>

      </div>
  </div>

</>
:
<>
<h3 className='text-danger py-5 text-capitalize text-center'>Sorry No Data In The Cart</h3>
</>



}

</>

}

 

  </>
}
