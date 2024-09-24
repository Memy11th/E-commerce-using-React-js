import axios from 'axios';
import  { useContext, useEffect, useState } from 'react';
import { dataContext } from '../../context/dataContext';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import toast from 'react-hot-toast';
import { WishlistContext } from '../../context/WishlistContext';


export default function RecentProducts() {
  const { BaseURL } = useContext(dataContext);
  const { addProductToCart,setCartNumber,setAnimate } = useContext(CartContext);
  const { addProductToWishlist , setWishlistItems,wishlistNum, setWishlistNum } = useContext(WishlistContext);
  const [Products, setProducts] = useState([]);
  const[Error,setError]=useState('')
  const [BtnLoading, setBtnLoading] = useState(false);
  const [CurrentID, setCurrentID] = useState(null);
  let [isLoading,setIsLoading] = useState(false)
  let navigate = useNavigate()

 async function addProduct(productId){
  setCurrentID(productId);
  setBtnLoading(true)
    let Response = await addProductToCart(productId);
    console.log(Response)
    setBtnLoading(false);
    if(Response.data.status === 'success'){
      toast.success(Response.data.message,{
        duration:2000,
  
      });
      setCartNumber(Response.numOfCartItems)
      setAnimate(true)

    }else {
      toast.error(Response.data.message,{
        duration:2000,
      })
    }
  }
  async function addToWishlist(productId){
    let Response = await addProductToWishlist(productId)
    setWishlistItems(Response.data);
    setWishlistNum(Response.data.count)
    setIsLoading(false)
  }

  function getProducts() {
    axios
      .get(`${BaseURL}/api/v1/products`)
      .then(({ data }) => {
        setProducts(data.data);
        console.log(data)
      })
      .catch((apiError) => {
        console.error(apiError);
        setError(apiError.data)
        
      });
  }


  useEffect(() => {
    getProducts();
  },[]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <i className="fas fa-spinner animate-spin text-3xl text-blue-500"></i>
      </div>
    );
  } 




  if (Error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-red-500">{Error}</p>
      </div>
    );
  }
  return (
    <>
      {Products.length > 0 ? (
        <div className="row">
          {Products.map((product) => (
            <div key={product._id} className="w-1/3 px-2 rounded-lg overflow-hidden scale-70 hover:transform hover:scale-105 transition duration-1000">
           
              <div className="max-w-xl my-3 mx-6">
                <div className="bg-white shadow-md rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
                  <div className='relative  rounded-xl'>
                
                  <img
                    className="rounded-t-lg overflow-hidden p-8 imgProd"
                    src={product.imageCover}
                    alt={product.title}
                  />
                 
                  <div className='layer opacity-0 hover:opacity-100   absolute flex transition-opacity duration-300  text-center justify-center items-center gap-4 bg-black bg-opacity-20 w-full h-full left-0 right-0 top-0 bottom-0 text-white'>
                    <div onClick={()=>addToWishlist(product._id)} className='icon cursor-pointer hover:scale-105 transition-transform duration-300 hover:-rotate-12 bg-blue-700 p-2 rounded-full w-8 h-8 text-center flex justify-center items-center'>
                   
            <i  className="text-white transition-all duration-200 hover:scale-125 hover:text-red-700 fa-solid fa-heart"></i>
                    </div>
                    <div className='icon cursor-pointer hover:scale-125 hover:bg-green-800 transition-all duration-300 hover:rotate-12  bg-green-600 p-2 rounded-full w-8 h-8 text-center flex justify-center items-center'>
                    <Link
              to={`/productdetails/${product._id}/${product.category.name}`}>
                  <i className="fa-solid fa-cart-shopping text-white"></i>
                  </Link>
                    </div>
                    <div  className='icon cursor-pointer  hover:scale-105 transition-transform duration-300 hover:rotate-12  bg-blue-700 p-2 rounded-full w-8 h-8 text-center flex justify-center items-center'>
                    <i  className="fa-solid hover:text-black hover:scale-125  fa-eye text-white"></i>
                    </div>

                  </div>
                  </div>
                  <div className="px-5 pb-5">
                    <h3 className="text-gray-900 font-semibold text-xl tracking-tight dark:text-white">
                      {product.title.length > 20 ? `${product.title.slice(0, 30)}...` : product.title}
                    </h3>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-3xl font-bold text-gray-900 dark:text-white">
                        {product.price} EGP
                      </span>
                      <span>
                        {product.ratingsAverage} <i className="fas fa-star text-yellow-300"></i>
                      </span>
                      </div>
                      <div className='mx-auto w-full'>
                      <button onClick={()=>addProduct(product._id)}  className="text-white transition duration-700 w-full  bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      {BtnLoading && CurrentID === product._id  ? <i className='fas fa-spinner fa-spin  text-center mx-auto '></i> : 'Add to cart' }
                       </button>
                      </div>
                      
                      
                    
                  </div>
                </div>
              </div>
            
            
            </div>
            
          ))}
        </div>
      ) : (
        <div className="min-h-screen flex justify-center items-center">
          <i className="fas fa-spinner animate-spin text-3xl text-blue-500"></i>
        </div>
      )}
    </>
  );
}
