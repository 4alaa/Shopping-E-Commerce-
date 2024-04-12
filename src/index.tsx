import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import $ from "jquery"
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import "@fortawesome/fontawesome-free/css/all.min.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import './index.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(

    <App />
);


