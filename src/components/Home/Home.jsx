import React, { useContext, useEffect, useState} from 'react'
import { userContext } from '../../Context/userDataContext'
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts'
import OwlCarousel from 'react-owl-carousel';
import { cartContext } from '../../Context/cartContext';
import Slider from "react-slick";

import img1 from '../../assets/999.jpg'

import img2 from '../../assets/888.jpg'

import img3 from '../../assets/3.webp'

import img4 from '../../assets/4.jpg'

import img5 from '../../assets/6.webp'

import img6 from '../../assets/55555.jpg'

import img7 from '../../assets/666.webp'
import BtnScroll from '../btbScroll/BtnScroll';

import {Helmet} from "react-helmet";



export default function Home() {



  let {userData,saveUserData}=useContext(userContext)

  let {getAllCategories}=useContext(cartContext)

  // categories
  let [myCategories,setCategories]=useState([])


  async function FinalGetAllCategories()
  {
    let response=await getAllCategories()



    if(response.statusText=="OK")
    {
      // console.log(response.data.data)

      setCategories(response.data.data)

    }
  }




  function callSave()
  {
    saveUserData()
  }


// for slick slider
  var settings = {
    // dots: true,
    // infinite: true,
    // speed: 500,
    // slidesToShow: 6,
    // slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  };
  



// for arrow up



  useEffect(()=>{

    callSave()
    FinalGetAllCategories()

  },[])




  // call products

  

  return <>
<Helmet>
<meta charSet="utf-8" />
<title>Home   </title>
</Helmet>

{/* for header slider */}
<div className="container">
  <div className="row flex-wrap">


<div className="col-md-8">

<OwlCarousel className='owl-theme' loop  autoplay={true} items={1}  >


<img src={img3} className='w-100 h-50 leftImg object-fit-cover' alt="" />
<img src={img4} className='w-100 h-50 leftImg object-fit-cover' alt="" />
<img src={img5} className='w-100 h-50 leftImg object-fit-cover' alt="" />
<img src={img6} className='w-100 h-50 leftImg object-fit-cover' alt="" />
<img src={img7} className='w-100 h-50 leftImg object-fit-cover' alt="" />



</OwlCarousel>;

</div>

<div className="col-md-4">
<img src={img1} className='w-100 rightImg' alt="" />

<img src={img2} className='w-100 rightImg' alt="" />


</div>
    
  </div>
</div>




{/* for category slider */}


<Slider {...settings}>



{myCategories?.map((el)=>{
      return     <div class='item' className='w-100'>
      <img src={el.image} className='homeSliderImg' alt="" />
  </div>
    })}



</Slider>





<BtnScroll/>


    <p className='text-center mt-4 fs-3'>welcome {userData.name}</p>



    <FeaturedProducts/>
  
  </>

  
}
