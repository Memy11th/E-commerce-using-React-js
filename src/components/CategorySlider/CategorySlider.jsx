/* import axios from 'axios';
import  { useContext, useEffect, useState } from 'react'
import Slider from "react-slick";
import { dataContext } from '../../context/dataContext';

export default function CategorySlider() {
  const { BaseURL } = useContext(dataContext);
  const[Error,setError] = useState(null)


  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
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
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

    

  function getCategoriesPics(){
    axios.get(`${BaseURL}/api/v1/products`).then(({data})=>{
      let Response = data.data.map((product)=>product.imageCover);
      setCategoryImages(Response);
      console.log(Response);
      
    })
    .catch((ApiError)=>setError(ApiError))        
  }

    useEffect(()=>{

      getCategoriesPics();

    },[])
  return <>
<div className="slider-container">
      <Slider {...settings}>
        
      </Slider>
    </div>
   
  
  </>
}
  
*/