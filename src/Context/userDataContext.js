import { jwtDecode } from "jwt-decode";
import React,{createContext, useState } from "react";


export let userContext=createContext(0)










 function UserContextProvider(props) {
    
    function launch_toast(ico,errMsg) {
        var x = document.getElementById("toast")
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
    
        document.querySelector("#desc").innerHTML=errMsg
        document.querySelector("#img").innerHTML=ico
    
    }




    let [userData,setUserData]=useState("")

function  saveUserData() {
    

    if(localStorage.getItem("shoppingUserToken"))
    {
        let encodedData=localStorage.getItem("shoppingUserToken")

        let decodedData=jwtDecode(encodedData)
    
        setUserData(decodedData)
    }
    else
    {
        setUserData("")
    }



}















    return <userContext.Provider value={{saveUserData,userData,launch_toast,setUserData}}>

        {props.children}
    </userContext.Provider>

}


export default UserContextProvider