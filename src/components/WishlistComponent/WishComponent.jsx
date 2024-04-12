import React, { useContext, useEffect, useState } from 'react'
import { wishlistContext } from '../../Context/wishlistStore'
import { userContext } from '../../Context/userDataContext'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import {Helmet} from "react-helmet";

export default function WishComponent() {

  let [PutloderSpinner,isLoading]=useState(false)

    let {saveUserData,userData}=useContext(userContext)

    let [userWishlist,setUserWishlist]=useState([])
    
    let {removeItemFromWishList,GetLogeduserWishlist,setWishNum}=useContext(wishlistContext)



    async function finalGetUserWishList() {
      isLoading(true)

        let response= await GetLogeduserWishlist()


        setUserWishlist(response.data.data)


        // console.log(response.data.data)

        isLoading(false)

    }


    let navigateTo=useNavigate()

    async function finalremoveItemFromWishList(ProductId)
    {

        let response=await removeItemFromWishList(ProductId)

        // console.log(response)

        if(response.data.status=="success")
        {

            toast.success(response.data.message,{className: "bg-danger text-center"})
            navigateTo("/") 
            setUserWishlist(response.data.data)

            setWishNum(response.data.data.length)



        }

    }

    useEffect(()=>{
        saveUserData()

        finalGetUserWishList()
    },[])

  return <>

<Helmet>
<meta charSet="utf-8" />
<title>My WishList  </title>
</Helmet>
  {PutloderSpinner==true?<div className='d-flex justify-content-center align-items-center mt-5'>

<span class="loader"></span>


</div>
:

<>
<div>
      {userWishlist?.length!=[]?
<>
<h3 className='mt-2 text-center'>Wishlist  ( {userData?.name}  )</h3>
  

  <div className="container">
      <div className="row">



      <div className="container">
        <div className="row g-4 align-items-center">

<br />
<hr />
        {userWishlist?.map((el)=>< >
        
        <div className="col-md-4 d-flex justify-content-center align-items-center">
            {/* <img src={el.imageCover} className='wishImgs' alt="" /> */}
            <div className="imgs d-flex flex-wrap gap-3 justify-content-center">
              {el?.images?.map((imageFashion)=>{

                return  <img src={`https://ecommerce.routemisr.com/Route-Academy-products/`+imageFashion} className='wishImgs' alt="" /> 

              })}

            </div>
        </div>
        <div className="col-md-8 d-flex justify-content-between">
        
        <div className="aboutProduct">
        <p> <span>{el?.title}</span>( <span className='text-success'>{el?.category?.name}</span> )</p>
        <p>price : {el?.price} <span className='text-success'>EGP</span></p>

        <button className='btn btn-outline-danger' onClick={()=>{
            finalremoveItemFromWishList(el._id)
            // console.log(el._id)
        }}><i class="fa-solid fa-heart-crack me-2"></i>Remove Product From My Wishlist</button>
        </div>
  



 
        


        
        </div>
        <hr className='border border-5' />

        </>)}



        </div>
      </div>

      </div>
  </div>

</>
:
<>
<h3 className='text-danger py-5 text-capitalize text-center'>Sorry No Data In The Wishlist</h3>
</>



}
    </div>

</>


}

    </>
}
