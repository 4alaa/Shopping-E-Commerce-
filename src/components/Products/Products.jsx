import React, { useContext, useEffect, useState } from 'react'
import { cartContext } from '../../Context/cartContext'
import axios from 'axios'
import toast from 'react-hot-toast';
import { wishlistContext } from '../../Context/wishlistStore';
import { Link } from 'react-router-dom'
import {Helmet} from "react-helmet";


export default function Products() {

  let {getAllbrands,getAllCategories}=useContext(cartContext)


  // categories
  let [myCategories,setCategories]=useState([])


  async function FinalgetAllCategories()
  {
    let response=await getAllCategories()



    if(response.statusText=="OK")
    {
      // console.log(response.data.data)

      setCategories(response.data.data)

    }
  }


// brands
  let [myBrands,setBrands]=useState([])

  async function FinalgetAllBrands()
  {
    let response=await getAllbrands()



      // console.log(response.data.data)

    if(response.statusText=="OK")
    {
      // console.log(response.data.data)

      setBrands(response.data.data)

    }


  }






 

 

  useEffect(()=>{
FinalgetAllCategories()
FinalgetAllBrands()
  },[])

  let [myProducts,setMyProducts]=useState([])


  let [PutloderSpinner,isLoading]=useState(false)


  let {addToCart,setCartNum,getLoggedUserCart}=useContext(cartContext)


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


    // for like and remove

    let [userWishlist,setUserWishlist]=useState([])
    
    let {removeItemFromWishList,GetLogeduserWishlist}=useContext(wishlistContext)



    async function finalGetUserWishList() {

        let response= await GetLogeduserWishlist()


        setUserWishlist(response.data.data)


        // console.log(response.data.data)




    }


  // add to wish
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

  

let sCategory
let SelctedBrand


function handleChange(w) {

  sCategory=w.value

  getCateVal()

  }

  function handleChange2(w) {

    SelctedBrand=w.value
  
    getCateVal2()
  
    }

  let [myCate,setC]=useState("")
  let [myBrand,setBrand]=useState("")

  function getCateVal()
  {
    setC(sCategory)
  }

  function getCateVal2()
  {
    setBrand(SelctedBrand)
  }


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

useEffect(()=>{
getProducts()
finalGetLogedCart()
setC("Women's Fashion")
setBrand("DeFacto")
finalGetUserWishList()

},[])


useEffect(()=>{


  finalGetUserWishList()
  
},[finalGetUserWishList])



  
  return <>

<Helmet>
<meta charSet="utf-8" />
<title>Products  </title>
</Helmet>
  
  <div className="container">
    <div className="row g-5 mb-5 justify-content-center">
 

<br />

<h3 className='text-center mt-4 text-toma'>{myCate} Category</h3>


{/* categories */}
    {myCategories?.map((el)=>{
    return <div className='col-md-2 shadow text-center rounded-pill d-flex justify-content-center align-items-center '>


<input type="radio" name="myRadios" className='me-2 opacity-0'  id={el.name} onClick={(w)=>{handleChange(w.target)}}  value={el.name}  />

<label className='pointer' htmlFor={el.name}>{el.name}</label>



    <h2>{sCategory} </h2>

    </div>
  })}


<h3 className='text-center mt-4 text-toma'>{myBrand} brand</h3>

{/* brands */}
{myBrands?.map((el)=>{
    return <div className='col-md-2 shadow text-center rounded-pill d-flex justify-content-center align-items-center '>


<input type="radio" name="myRadios" className='me-2 opacity-0'  id={el.name} onClick={(w)=>{handleChange2(w.target)}}  value={el.name}  />

<label className='pointer' htmlFor={el.name}>{el.name}</label>



    {/* <h2>{sCategory} </h2> */}

    </div>
  })}



    </div>
  </div>



  {/*all data* */}

  <>
<h2 className='py-5 text-center text-success'>All {myCate} <span className='text-danger'>({myBrand})</span> Brand</h2>
  {PutloderSpinner==true?<div className='loadScreanforProduct '>

    <span class="loader"></span>

  </div>
  
  
  :
  
  
  
  <div className="container">
  <div className="row justify-content-center g-4 ">

    {myProducts?.map((el)=><div key={el._id} className={el?.category?.name?.trim()==`${myCate}`&&el?.brand?.name?.trim()==`${myBrand}`?"product_item col-md-6 col-lg-4":"d-none"}>

    {el?.category?.name?.trim()==`${myCate}`&&el?.brand?.name?.trim()==`${myBrand}`?
    
  <>
        <Link to={`/productdetails/${el._id}`} className='pointer text-decoration-none'>


      <img src={el.imageCover} className="w-100" alt="" />


<h4 className='text-success pt-2 text-center'>{el?.category?.name}</h4>

<h5 className='text-muted text-center '>{el.title.slice(0,30)}</h5>

<div className="d-flex justify-content-between mx-4 mt-2">
  <p>{el.price} <span className='text-success'>EGP</span></p>

  <p>{el.ratingsAverage} <i class="fa-solid fa-star text-warning"></i></p>
</div>




      </Link>
      <div className="d-flex justify-content-between mx-4 mt-2 align-items-center">
          
          <button className='btn btn-outline-success' onClick={()=>{FinalAddToCart(el._id)}}>+ Add to cart</button>

          <i className={"fa-solid fa-heart fs-4 text-danger" } title="Add to wishList" onClick={()=>{
            
            finalAddToWishList(el._id)
          }}></i> 

           {/* <i className="fa-solid fa-heart fs-4 text-danger"></i> */}
         
        </div>





  </>
  
  :

  <>


  </>
  }



{el?.category?.name?.trim()==`${myCate}`? ""
:<h2 className='text-info text-info'>{myCate} will add Soon</h2>}


      
      </div>
    )}

    
  </div>
</div>
  
  
  }






  
  </>
  </>
}
