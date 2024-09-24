import { createContext, useEffect, useState } from 'react';
import axios from 'axios'

export const WishlistContext = createContext()

export default function WishlistContextProvider(props) {
let [wishlistItems , setWishlistItems] = useState([]);
let [wishlistCount,setWishListCount] = useState(null)
let [wishlistNum, setWishlistNum] = useState(null)



  function getLoggedWishlist(){
   return axios.get('https://ecommerce.routemisr.com/api/v1/wishlist',{
      headers : {
        token : localStorage.getItem('UserToken')
      }
    }).then((ApiResponse)=>ApiResponse)
    .catch((ApiError)=>ApiError)
  }
  async function getWishlistNum(){
    let Response = await getLoggedWishlist();
    setWishlistNum(Response.data.count)
  }


  function addProductToWishlist(productId){
  return  axios.post('https://ecommerce.routemisr.com/api/v1/wishlist',{
      productId 
    },{
      headers: {
        token : localStorage.getItem('UserToken')
      }
    }).then((Response)=>Response)
    .catch((Error)=>Error)
  }

  function deleteProductFromWishlist(productId){
   return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{
      headers:{
        token : localStorage.getItem('UserToken')
      }
    }).then((Response)=>Response)
    .catch((Error)=>Error)
  }
    



    useEffect(()=>{

    },[])
  return <>
  <WishlistContext.Provider value={{getLoggedWishlist,wishlistItems , setWishlistItems,addProductToWishlist,deleteProductFromWishlist,wishlistNum, setWishlistNum,getWishlistNum}}>
{props.children}
  </WishlistContext.Provider>
  
  </>
}
