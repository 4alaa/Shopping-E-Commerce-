import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../../Context/cartContext'
import { useParams } from 'react-router-dom'
import Slider from "react-slick";
import { wishlistContext } from '../../Context/wishlistStore';
import toast from 'react-hot-toast';
import {Helmet} from "react-helmet";

export default function ProductDetails() {
  let [PutloderSpinner,isLoading]=useState(false)


    let {getDetails}=useContext(cartContext)

    let {productId}=useParams()

    let [productDetails,setDetails]=useState([])
    async function finalGetDetails()
    {
      isLoading(true)
        let response=await getDetails(productId)

        // console.log(response.data.data)

        setDetails(response?.data?.data)

        isLoading(false)
    }



    var settings = {
      fade: true,
      speed: 700,
      dots: true,
      arrows: false,
      autoplay: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
    };



      let {addToCart,setCartNum}=useContext(cartContext)

      let {setCartOwner,setWishNum,addToWishList}=useContext(wishlistContext)
    // add to cart
    async function FinalAddToCart(productId)
    {

      let response=await addToCart(productId)

      // console.log(response)

      if(response.data.status=="success")
      {
        toast.success(response.data.message,{duration:2000,className:"text-center"})

        setCartNum(response?.data?.numOfCartItems)

        setCartOwner(response?.data?.data?.cartOwner)
      }
    }



    // for like and remove

    let [userWishlist,setUserWishlist]=useState([])
    
    let {removeItemFromWishList,GetLogeduserWishlist}=useContext(wishlistContext)



    async function finalGetUserWishList() {

        let response= await GetLogeduserWishlist()


        setUserWishlist(response.data.data)


        // console.log(response.data.data)




    }


  // remove from wish list

  async function finalremoveItemFromWishList(ProductId)
  {
  
      let response=await removeItemFromWishList(ProductId)
  
      // console.log(response)
  
      if(response.data.status=="success")
      {
  
          toast.success(response.data.message,{className: "bg-danger text-center"})
          setUserWishlist(response.data.data)
  
          setWishNum(response.data.data.length)
  
  
  
      }
  
  }

    // add to wish list
    // async function finalAddToWishList(productId) {
      
    //     let response=await addToWishList(productId)
        
    //     if(response.data.status=="success")
    //     {
    //       toast.success(response.data.message,{style:{border: "3px solid tomato"},className:"text-center bg-warning"})
  
    //       setWishNum(response.data.data.length)
    //     }
  
    //   }

    async function finalAddToWishList(productId) {


      // add and remove in wishlist
      for (let i = 0; i < userWishlist.length; i++) {
       
        if(userWishlist[i]._id==productId)
        {

          finalremoveItemFromWishList(productId)
          
          return 
        }
        
      }


      let response=await addToWishList(productId)
      
      if(response.data.status=="success")
      {
        toast.success(response.data.message,{style:{border: "3px solid tomato"},className:"text-center bg-warning"})

        setWishNum(response.data.data.length)

        // console.log(response.data.data)


        // setLikeData([...response.data.data])
      }

      
      

    }


    useEffect(()=>{


      finalGetUserWishList()
      
    },[finalGetUserWishList])
    

    useEffect(()=>{
        finalGetDetails()
    },[])

  return <>
<Helmet>
<meta charSet="utf-8" />
<title>Product Details  </title>
</Helmet>
  {PutloderSpinner==true?
  
<div className='d-flex justify-content-center align-items-center mt-5'>

<span class="loader"></span>


</div>
:
<>
<div className="container">
    <div className="row mt-5">
        

<div className="col-md-4">
<Slider {...settings}>

    
    {productDetails?.images?.length!=1?productDetails?.images?.map((el)=>{

        return  <img src={el} className='detaiedImg  mx-auto' alt="" />     
    })
    :
<>
{<img src={productDetails?.images[0]} className='detaiedImg  mx-auto' alt="" />  }
</>

}
    
    </Slider>

             <h5 className='mt-4 text-toma text-center mt-4'>{productDetails?.title} 
             {/* ({productDetails?.subcategory[0]?.name}) */}
             </h5> 

</div>

<div className="col-md-8">
    <div className="details-caption">
         <h4 className='text-center'>( <span className='text-success'>( {productDetails?.category?.name} )</span> )</h4>

         <p className='text-muted mt-4'>{productDetails.description}</p>

         <p>- Items Sold :  {productDetails.sold} items</p>

         <p>- The Remaining Quantity :  {productDetails.quantity} items </p>

        <p>- Price :  {productDetails.price} <span className='text-toma'>EGP</span> </p>

        <p>- Brand : {productDetails?.brand?.name}</p>

        <p> - ratingsAverage : {productDetails.ratingsAverage} <i class="fa-solid fa-star text-warning ms-1"></i></p>

        <div className="d-flex justify-content-between mx-4 mt-2 align-items-center">
          
          <button className='btn btn-outline-success' onClick={()=>{FinalAddToCart(productId)}}>+ Add to cart</button>

          <i className={"fa-solid fa-heart fs-4 text-danger pointer" } title="Add to wishList" onClick={()=>{
            
            finalAddToWishList(productId)
          }}></i> 


           {/* <i className="fa-solid fa-heart fs-4 text-danger"></i> */}
         
        </div>

    </div>
</div>



    </div>
  </div>
</>
}
  


  
  
  </>
}
