import ProductCard from "../ProductCard/ProductCard"
import axios from 'axios';
import  { useContext, useEffect, useState } from 'react';
import { dataContext } from '../../context/dataContext';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import toast from 'react-hot-toast';

export default function Home() {
  const { BaseURL } = useContext(dataContext);
  const { addProductToCart,setCartNumber,setAnimate } = useContext(CartContext);
  const [Products, setProducts] = useState([]);
  const[Error,setError]=useState('')
  const [BtnLoading, setBtnLoading] = useState(false);
  const [CurrentID, setCurrentID] = useState(null);
/*
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
*/
  function getProducts() {
    axios
      .get(`${BaseURL}/api/v1/products/`)
      .then(({ data }) => {
        setProducts(data.data);
      })
      .catch((apiError) => {
        console.error(apiError);
        setError(apiError.data)
        
      });
  }


  useEffect(() => {
    getProducts();
  },[]);

  if (Error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-red-500">{Error}</p>
      </div>
    );
  }

  return  <>
 <div className=" grid grid-cols-12 gap-7 mx-3 py-3">
  {Products?.map((product)=>(
 <ProductCard key={product.id} productInfo = {product} />

  ))}

 </div>
    </>
  
}
