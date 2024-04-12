import React from 'react'

import imgErr from "../../assets/404.jpg"

import {Helmet} from "react-helmet";


export default function ErrorPage() {
  return <>

<Helmet>
<meta charSet="utf-8" />
<title>Error 404  </title>
</Helmet>
  
  <div className="container">
    <div className="row justify-content-center align-items-center">

    <img src={imgErr}  className="w-50" alt="" />

    </div>
  </div>
  </>
}
