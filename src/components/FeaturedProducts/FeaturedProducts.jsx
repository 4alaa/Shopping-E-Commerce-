import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../../Context/cartContext'
import toast from 'react-hot-toast';
import { wishlistContext } from '../../Context/wishlistStore';
import { Link } from 'react-router-dom'

export default function FeaturedProducts() {



    let [myProducts,setMyProducts]=useState([])


    let [PutloderSpinner,isLoading]=useState(false)


    let {addToCart,setCartNum,getLoggedUserCart}=useContext(cartContext)





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









    // for cart owner

    async function finalGetLogedCart()
    {
        let response=await getLoggedUserCart()

        // console.log(response)


        if(response?.data?.status=="success")
        {
            // console.log(response.data.data.cartOwner)

            setCartOwner(response?.data?.data?.cartOwner)


        }
    }
    


    let {setCartOwner,setWishNum}=useContext(wishlistContext)





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



    // get all products
    async function getProducts() {
      isLoading(true)
        let {data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)

        setMyProducts(data.data)
        // console.log(data.data)


      isLoading(false)

    }



    // add to wishlist

    let {addToWishList}=useContext(wishlistContext)


    // let [allLIKWDData,setLikeData]=useState([])

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
getProducts()
finalGetLogedCart()

},[])


useEffect(()=>{


  finalGetUserWishList()
  
},[finalGetUserWishList])







  return <>

  {PutloderSpinner==true?<div className='loadScreanforHome '>

    <span class="loader"></span>

  </div>
  
  
  :
  
  
  
  <div className="container">
  <div className="row justify-content-center g-4">

    {myProducts?.map((el)=><div key={el._id} className="product_item col-md-6 col-lg-4 ">


      <Link to={`/productdetails/${el._id}`} className='pointer text-decoration-none'>

      <img src={el.imageCover} className="w-100" alt="" />

<h4 className='text-success pt-2 text-center'>{el?.category?.name}</h4>

<h5 className='text-muted text-center '>{el.title.slice(0,30)}</h5>

<div className="d-flex justify-content-between mx-4 mt-2">
  <p>{el.price} <span className='text-success'>EGP</span></p>

  <p>{el.ratingsAverage} <i class="fa-solid fa-star text-warning"></i></p>
</div>




      </Link>




        <div className="d-flex justify-content-between mx-4 mt-2 align-items-center flex-wrap justify-content-center">
          
          <button className='btn btn-outline-success me-2 mb-2' onClick={()=>{FinalAddToCart(el._id)}}>+ Add to cart</button>







          <i className={"fa-solid fa-heart fs-4 text-danger" } title="Add to wishList" onClick={()=>{
            
            finalAddToWishList(el._id)
          }}></i> 






           {/* <i className="fa-solid fa-heart fs-4 text-danger"></i> */}
         
        </div>
      
      </div>
    )}

    
  </div>
</div>
  
  
  }






  
  </>

  
}

