import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const CartContext = createContext();

export default function CartContextProvider(props) {
    let [CartItems,setCartItems] = useState([]);
    let [CartId,setCartId] = useState('');
    let [ordersItems,setOrdersItems] = useState([])
    let [userName,setUserName] = useState('');
    let [CartNumber, setCartNumber] = useState(0)
    let [animate,setAnimate] = useState(false)
    let decoded ;
    
    function getUserDetails(){
        
        if(localStorage.getItem('UserToken')){
            const token = localStorage.getItem('UserToken');
            decoded = jwtDecode(token);
            console.log(decoded.id);
            console.log(decoded.name);
        }
console.log(decoded)
        return decoded
    }


    function getUserName(){
        return decoded.name
    }


 function getOrders(){
   return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${decoded.id}`)
    .then((ApiResponse)=>ApiResponse)
    .catch((ApiError)=>ApiError)
  }  
  




 // all functions are called in UserCart.jsx
 
// function to add product to cart needs product id from recent products and product details
function addProductToCart(productId){
   return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{
        productId : productId
    },{
        headers: {
            token : localStorage.getItem('UserToken')
        }
    })
    .then((ApiResponse)=>ApiResponse)
    .catch((ApiError)=>ApiError)
}

// function to get number of cart items
async function getCartItemsNumber(){
  let Response = await getUserCart();
  setCartNumber(Response.data.numOfCartItems);
}


// function to get logged user cart gets the user token
function getUserCart() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: {
            //Authorization: `Bearer ${localStorage.getItem('UserToken')}`
            token : localStorage.getItem('UserToken')
        }
    })
    .then((ApiResponse) => ApiResponse)
    .catch((ApiError) => ApiError);
} 


// function to delete a product from the cart , needs product id from recent products and product details
function deleteItemFromCart(productID){
    return  axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productID}`,{
        headers: {
            token: localStorage.getItem('UserToken')
        }
        })
    .then((ApiResponse)=>ApiResponse)
    .catch((ApiError)=>ApiError)
    
}

// function to clear all cart 
function clearCart(){
  return  axios.delete('https://ecommerce.routemisr.com/api/v1/cart',{
        headers : {
            token : localStorage.getItem('UserToken')
        }
    })
    .then((ApiResponse)=>ApiResponse)
    .catch((ApiError)=>ApiError)
}

// function to update the cart items numbers 
function updateCart(productID,num){
   return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productID}`,{
        count : num
    },{
        headers: {
            token : localStorage.getItem('UserToken')
        }
    })
    .then((Response)=>Response)
    .catch((ApiError)=>ApiError)
}

// function to make a checkout session and confirm order 
function CheckOutSession(CartId,url,formValues){
     return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${CartId}?url=${url}`,{
        shippingAddress : formValues
    },{
        headers : {
            token : localStorage.getItem("UserToken")
        }
    }).then((Response)=> Response)
    .catch((Error)=>Error)
}
 useEffect(()=>{
    
    getUserDetails();
    getCartItemsNumber();
    if (animate) {
        const timer = setTimeout(() => {
          setAnimate(false);
        }, 800); // Match the duration with the Tailwind transition
        return () => clearTimeout(timer);
      }
 },[CartNumber , animate])

    return <CartContext.Provider value={{getUserName,addProductToCart,getUserCart,deleteItemFromCart,CartItems,setCartItems,clearCart,CartId,setCartId,updateCart,CheckOutSession,getOrders,ordersItems,setOrdersItems,userName,decoded,getUserDetails,CartNumber,getCartItemsNumber,setCartNumber,animate,setAnimate}}>
        {props.children}

    </CartContext.Provider>
}
