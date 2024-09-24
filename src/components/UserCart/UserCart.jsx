import  {  useContext, useEffect, useState } from 'react'
import { CartContext } from '../../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import '../../index.css'
import toast from 'react-hot-toast'

export default function UserCart() {
  let Navigate = useNavigate()
let {getUserCart,setCartNumber,deleteItemFromCart,CartItems,setCartItems,clearCart,updateCart,setAnimate} = useContext(CartContext);

const [loading,setLoading]=useState(true)

function redirectPage (){
  Navigate('/checkout')
}

async function getLoggedCart(){
let Response = await getUserCart();
setCartItems(Response.data.data);
setLoading(false);
}

async function updateCartItems(productId,num){
  let Response = await updateCart(productId,num);
  console.log(Response)
  setCartItems(Response.data.data);
  setCartNumber(Response.numOfCartItems);
  setAnimate(true)


}

async function deleteItemFromUserCart(ProductId){
  setLoading(true)
  let Response = await deleteItemFromCart(ProductId);
  setCartItems(Response.data.data);
  setCartNumber(Response.numOfCartItems)
  setAnimate(true)
  setLoading(false)

}

async function clearCartCall(){
  setLoading(true)
  let Response = await clearCart();
  await getLoggedCart();
  setAnimate(true);
  setLoading(false);
}


useEffect(()=>{
getLoggedCart();

},[]);



    if (loading) {
      return (
        <div className="min-h-screen flex justify-center items-center">
          <i className="fas fa-spinner animate-spin text-3xl text-blue-500"></i>
        </div>
      );
    } 


    if(CartItems?.products?.length === 0) {
      return ( <div className="min-h-screen flex justify-center items-center">
        <span><Link to={'/products'} className='font-bold text-2xl   text-gradient  '>GO SHOPPING NOW...</Link> </span>
        </div>
    )
    } 

      

    return <>

<div className="relative overflow-x-auto m-2 shadow-md sm:rounded-lg text-center">
<div className='text-right'>

  <h3 className='text-center text-gray-400 font-bold  text-3xl py-2'>Shopping cart</h3>
  <button onClick={()=>clearCartCall()} className='w-1/6 bg-red-700 overflow-hidden p-2 my-1 rounded-xl font-bold text-white '>
      Clear Cart <i className="fa-solid fa-cart-shopping"></i>
    </button>
</div>
  <table className="w-full text-sm text-left  rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs  text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
          Image
        </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
          Qty
        </th>
        <th scope="col" className="px-6 py-3">
         Price
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody className='w-full' >
      {CartItems?.products?.map((product)=>(
          <tr key={product.product.id} className="bg-white border-b w-full dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-4">
          <img src={product.product.imageCover} className="w-16 md:w-32 max-w-36 rounded-2xl max-h-28 " alt={product.product.title} />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
            {product.product.title}
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <button onClick={()=>updateCartItems(product.product.id, product.count-= 1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full  hover:bg-gray-100  focus:outline-red-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
              </svg>
            </button>
            <div>
              <span>{product.count}</span>
            </div>
            <button onClick={()=>updateCartItems(product.product.id,product.count+=1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full  hover:bg-gray-100 focus:outline-green-700 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
              </svg>
            </button>
          </div>
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
           <span>{product.price } EGP</span>
        </td>
        <td className="px-6 py-4">
          <button onClick={()=>deleteItemFromUserCart(product.product.id)}  className="font-medium text-red-600 dark:text-red-500 hover:text-red-700">Remove</button>
        </td>
      </tr>
      ))}

     
      
    </tbody>
  </table>
  <div className='flex justify-between'>

<button onClick={()=> redirectPage()} className='w-2/4 bg-green-700 p-2 m-2 rounded-xl font-bold text-white '>
  Checkout now 
</button>

<button className='w-2/4 bg-gray-200 cursor-default font-bold text-green-700 p-2 m-2 rounded-xl '>
{CartItems.totalCartPrice} EGP <span className='text-xs'>'excluding shipping fees'</span>
</button>

</div>

</div>





    </>
}
