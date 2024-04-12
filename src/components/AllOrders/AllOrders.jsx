
import React, { useContext, useEffect, useState } from 'react'
import { wishlistContext } from '../../Context/wishlistStore'
import { cartContext } from '../../Context/cartContext'
import { userContext } from '../../Context/userDataContext'

import {Helmet} from "react-helmet";


export default function AllOrders() {


  let [PutloderSpinner,isLoading]=useState(false)


  let {setCartOwner,myCartOwner,getUserOrders}=useContext(wishlistContext)


  let {getLoggedUserCart}=useContext(cartContext)









// get cartowner id
async function finalGetLogedCart()
{
    let response=await getLoggedUserCart()

    if(response?.data?.status=="success")
    {
      setCartOwner(response?.data?.data?.cartOwner)


    }
}


// get all my orders

let [allOrders,setAllOrders]=useState([])

async function finalGetAllOrders() {
isLoading(true)
  let response=await getUserOrders()

  // console.log(response.data.data)

  setAllOrders(response.data.data)
 
  isLoading(false)
}




async function sortFuncs()
{
    await finalGetLogedCart()
    finalGetAllOrders()

}




let {userData,saveUserData}=useContext(userContext)


function callSave()
{
  saveUserData()

  // console.log(userData)
}



useEffect(()=>{

  sortFuncs()

  callSave()


},[])








   return   <>

 {PutloderSpinner==true?<div className='d-flex justify-content-center align-items-center mt-5'>

 <span class="loader"></span>


 </div>
 :

 <>



   <div className="container mt-5">

    <p className='text-center text-danger'>About  ( Payment Method , Total price )</p>


   {allOrders!=[]?
  
 <>


 {allOrders?.length!=[]?allOrders?.map((el)=>{




       return <>

              <Helmet>
                <meta charSet="utf-8" />
                <title>All Orders</title>
            </Helmet>

{/* {userData.id==el.user._id?console.log(el.user._id):

<h4 className='text-danger text-center'>No Orders</h4>



} */}


     
         {userData.id==el.user._id?
          <p>Payment Method Type : {el.paymentMethodType=="card"?<span className='text-info fs-5 text-capitalize'>{el.paymentMethodType}</span> :
           <span className='text-toma fs-5 text-capitalize'>{el.paymentMethodType}</span> 
           }  </p>  
           :
           ""
         }






        {userData.id==el.user._id?
        
        <>
<div className="row">

{el?.cartItems?.map((item)=>{

  return<>
 
  <div className="col-md-3 text-center">
  <div className="item shadow">
  <img src={item.product.imageCover} className='orderItem rounded-circle mb-2' alt="" />
  <p className='text-center ms-2 mt-2'> {item.product.title.slice(0,30)}</p>
  <p className='text-start ms-2'>Count: {item.count}</p>
  <p className='text-start ms-2'>price: {item.price} <span className='text-danger'>EGP</span> </p>

  <p>Total price : {item.count} * {item.price} = {item.count*item.price} <span className='text-danger'>EGP</span> </p>
  </div>
</div> 


  </>



})}



</div>
<br />
<p className='text-center'>Total Order Price : {el.totalOrderPrice} <span className='text-danger'>EGP</span></p>

<hr className='border border-5' />
        </>
      
      :``}






       </>


     })
  
  
   :


   <>


   </>
  
   }


 </>

   :



   <>
  
   <h4 className='text-danger text-center'>No Orders</h4>
   </>

 }



   </div>

 </>

 }





   </>








// re=move
//   return <>
//   <h2>all orders</h2>
  
//   {allOrders?.map((el)=>{

// return <>


// <p>total prices :{el.totalOrderPrice}</p>

// </>

//   })}
  
//   </>



}


