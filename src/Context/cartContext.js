import  axios  from "axios";
import { createContext, useEffect, useState } from "react";




export let cartContext=createContext(0)


function CartContextProvider(props)
{
let headers={

    token:localStorage.getItem("shoppingUserToken")
}


    let [cartNum,setCartNum]=useState(0)

    async function getCartNum()
    {

        let response=await getLoggedUserCart()

        if(response?.data?.status=="success")
        {
            // console.log(response.data)
            setCartNum(response.data.numOfCartItems)
        }


    }



    useEffect(()=>{

        getCartNum()

    },[])




    function addToCart(productId)
    {
      return  axios.post(`https://ecommerce.routemisr.com/api/v1/cart`
    ,
    {
        productId:productId
    },
    {
        headers:headers
    }
    ).then((response)=>response)
    .catch((err)=>err)
    }



    function getLoggedUserCart()
    {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,
        {
            headers:headers
        })
        .then((response)=>response)
        .catch((err)=>err)
    }


    function removeCartItem(productId)
    {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
            headers:headers
        }).then((response)=>response)
        .catch((err)=>err)
    }


    function updateCountOfProduct(productId,count)
    {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`
        ,{

            count :count
        }
        
        ,{
            headers:headers
        }).then((response)=>response)
        .catch((err)=>err)
    }



    function clearCart()
    {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{
            headers:headers
        }).then((response)=>response).catch(err=>err)
    }



    function Checkout(CartId,shippingAddress)
    {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${CartId}?url=http://localhost:3000/#/`
        ,
        {
            shippingAddress:shippingAddress
        }
        ,{
            headers:headers
        }).then((response)=>response).catch(err=>err)
    }





    function createCashOrder(cartId,shippingAddress) {
        
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,{

        shippingAddress:shippingAddress
        },
        {
            headers:headers
        }).then((response)=>response).catch(err=>err)
    }





    function getDetails(productId)
    {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`).then((response)=>response).catch((err)=>err)
    }







    function getAllCategories()
    {

        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`).then((response)=>response).catch((err)=>err)

    }

    function getAllbrands()
    {

        return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`).then((response)=>response).catch((err)=>err)

    }


    





    return <cartContext.Provider value={{getAllbrands,getAllCategories,getDetails,createCashOrder,setCartNum,cartNum,addToCart,getLoggedUserCart,removeCartItem,updateCountOfProduct,clearCart,Checkout}}>

        {props.children}
    </cartContext.Provider>
}

export default  CartContextProvider