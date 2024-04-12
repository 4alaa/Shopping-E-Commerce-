import axios from "axios";
import { createContext, useEffect, useState } from "react";




export let wishlistContext=createContext(0)



function WishProvider(props) {
    



    let headers={

        token:localStorage.getItem("shoppingUserToken")
    }



    function addToWishList(productId) {
        
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{

        productId:productId
        },
        {
            headers:headers
        }).then((response)=>response)
        .catch((err)=>err)
    }




    function removeItemFromWishList(productId) {
        

        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        {
            headers:headers
        }
        ).then((response)=>response)
        .catch((err)=>err)
    }
    



    function  GetLogeduserWishlist() {
        

        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
            headers:headers
        }
        ).then((response)=>response)
        .catch((err)=>err)
    }


    // number of wish items
    let [wishNum,setWishNum]=useState(0)


    async function finalgetWishNum()
    {

        let response=await GetLogeduserWishlist()

        setWishNum(response.data.count)

    }

    useEffect(()=>{

        finalgetWishNum()

    },[])




    let [myCartOwner,setCartOwner]=useState(null)


    
    function getUserOrders()
    {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/`).then((response)=>response).catch((err)=>err)
    }







    return <wishlistContext.Provider value={{wishNum,setWishNum,getUserOrders,setCartOwner,myCartOwner,addToWishList,removeItemFromWishList,GetLogeduserWishlist}}>

    {props.children}

    </wishlistContext.Provider>
}



export default WishProvider