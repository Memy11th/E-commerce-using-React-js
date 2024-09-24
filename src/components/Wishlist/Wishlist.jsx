import { useContext, useEffect, useState } from 'react';
import { WishlistContext } from '../../context/WishlistContext';
import { CartContext } from '../../context/CartContext';
import { Link } from 'react-router-dom';
export default function Wishlist() {

 let {getLoggedWishlist,wishlistItems , setWishlistItems,deleteProductFromWishlist,wishlistNum,setWishlistNum} = useContext(WishlistContext);
 let {addProductToCart,CartNumber, setCartNumber} = useContext(CartContext);
 let [isLoading,setIsLoading] = useState(false);


async function currentWishlist(){
  setIsLoading(true);
  let Response = await getLoggedWishlist();
  setWishlistItems(Response.data);
  console.log(Response.data);
  setWishlistNum(Response.data.count)
  setIsLoading(false);

}

async function deleteProductWishlist(productId){
  setIsLoading(true);
  let Response = await deleteProductFromWishlist(productId);
  setWishlistItems(Response.data);
  setWishlistNum(Response.data.count)
  setIsLoading(false);
}

async function addProductFromwishlistToCart(productId){
 let addResponse = await addProductToCart(productId);
 console.log(addResponse)
}


    useEffect(()=>{
        currentWishlist();


    },[])

    if (isLoading) {
      return (
        <div className="min-h-screen flex justify-center items-center">
          <i className="fas fa-spinner animate-spin text-3xl text-blue-500"></i>
        </div>
      );
    } 

    if(wishlistItems?.data?.length === 0) {
      return ( <div className="min-h-screen flex justify-center items-center">
        <span><Link to={'/products'} className='font-bold text-2xl   text-gradient  '>GO CHECK SOME PRODUCTS</Link> </span>
        </div>
    )
    }

  

  return <>

<div className='grid grid-cols-12 mt-2 p-3 gap-4 shadow-md '>

{wishlistItems?.data?.map((product)=>(
  <div key={product.id} className=' col-span-12 text-center lg:col-span-3 rounded-lg shadow-md p-2 '> 
  <img className='overflow-hidden rounded-2xl w-full shadow-md ' src={product.imageCover} alt={product.title} />
<h2 className='text-start font-semibold truncate pt-2 '>{product.title}</h2>
<div className='flex flex-wrap justify-between '>
<p className='font-bold'>{product.price} EGP</p>
<p>{product.ratingsAverage} <i className='fas fa-star text-yellow-400'></i> <span className='text-xs'>({product.ratingsQuantity})</span></p>
</div>
<div className='flex flex-wrap justify-between'>
<p className='text-sm font-semibold'>Quantity available : {product.quantity}</p>
<p className='text-sm font-semibold'>items sold : {product.sold}</p>
</div>
<div className='grid grid-cols-12 p-3 gap-4'>
<button onClick={()=> addProductFromwishlistToCart(product.id)}  className=' col-span-6 text-xs font-bold text-white rounded-lg p-2 bg-blue-700 hover:bg-blue-800 hover:scale-95 transition-all duration-300'> Add to cart </button>
<button onClick={()=>deleteProductWishlist(product.id)} className=' col-span-6 text-xs font-bold text-white rounded-lg p-2 bg-red-700 hover:bg-red-800 hover:scale-95 transition-all duration-300'> Remove </button>
</div>
  </div>
))}

  </div>
  
  </>
}
