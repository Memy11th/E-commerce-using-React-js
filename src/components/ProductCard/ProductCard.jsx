import  { useEffect, } from 'react'
import { Link } from 'react-router-dom'

export default function ProductCard({productInfo}) {

    
    useEffect(()=>{
    },[])
  return <>
  <div className=' cursor-pointer col-span-6  md:col-span-3 p-4 shadow-lg hover:scale-95 transition-all duration-700  overflow-hidden ease-in-out rounded-xl '>

    <div className='p-0 w-full relative rounded-lg overflow-hidden '>
      <div className='absolute opacity-0 bg-black bg-opacity-15 text-white m hover:opacity-100 flex justify-center gap-3 transition-all ease-in-out duration-300 items-center h-full w-full top-0 bottom-0 right-0 left-0 '>

      <div className='icon cursor-pointer hover:scale-105 transition-transform duration-300 hover:rotate-12 bg-blue-700 rounded-full w-8 h-8 text-center flex justify-center items-center'>
                    <i className="fa-solid fa-heart"></i>
                    </div>
                    <div className='icon cursor-pointer hover:scale-125 hover:outline-dotted hover:outline-offset-1 hover:outline-2 hover:outline-blue-700 hover:bg-green-700 transition-all duration-300 hover:rotate-12  bg-green-600 p-2 rounded-full w-8 h-8 text-center flex justify-center items-center'>
                    <Link>
                  <i className="fa-solid  fa-cart-shopping text-white"></i>
                  </Link>
                    </div>
                    <div className='icon cursor-pointer  hover:scale-105 transition-transform duration-300 hover:rotate-12  bg-blue-700 p-2 rounded-full w-8 h-8 text-center flex justify-center items-center'>
                    <i className="fa-solid fa-eye"></i>
              </div>
      </div>

      <img className=' rounded-lg overflow-hidden ' src={productInfo.imageCover} alt={productInfo.title} />
    </div>
    <div>
      <h5 className=' text-md truncate '>{productInfo.title}</h5>
    </div>
    <div className='flex justify-between'>
      <span>{productInfo.price} EGP</span>
      <span>{productInfo.ratingsAverage} <i className='fas fa-star text-yellow-500'></i> </span>
    </div>
    <button className='w-full   bg-blue-700 hover:bg-blue-900 p-3 rounded-lg shadow-sm hover:scale-95 transition-all duration-500'>Add to cart</button>

  </div>
  
  </>
}
