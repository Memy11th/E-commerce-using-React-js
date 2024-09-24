import  { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { dataContext } from '../../context/dataContext';
import axios from 'axios';
import Slider from "react-slick";
import { CartContext } from '../../context/CartContext';
import toast from 'react-hot-toast';


export default function ProductDetails() {
  const { BaseURL } = useContext(dataContext);
  const {addProductToCart,setCartNumber,setAnimate} = useContext(CartContext)
  const { ID, category } = useParams();
  const [productDetails, setProductDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [BtnLoading, setBtnLoading] = useState(false);
  const [CurrentID, setCurrentID] = useState(null);


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed:1500,
    pauseOnHover: true,
    
  };

  var settingss = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 1500,
    pauseOnHover: true,
    
  };

  function getProductDetails() {
    axios
      .get(`${BaseURL}/api/v1/products/${ID}`)
      .then(({ data }) => {
        setProductDetails(data.data);
        setLoading(false);
      })
      .catch((apiError) => {
        setError('Failed to fetch product details.');
        setLoading(false);
        console.error(apiError);
      });
  }

  function getRelatedProducts() {
    axios
      .get(`${BaseURL}/api/v1/products`)
      .then(({ data }) => {
        const allProducts = data.data;
        const filteredProducts = allProducts.filter(product => product.category?.name === category);
        setRelatedProducts(filteredProducts);
        setLoading(false);
      })
      .catch((apiError) => {
        setError('Failed to fetch related products.');
        setLoading(false);
        console.error(apiError);
      });
  }

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

  useEffect(() => {
    getProductDetails();
    getRelatedProducts();
  }, [ID, category]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <i className="fas fa-spinner animate-spin text-3xl text-blue-500"></i>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/4 py-2 px-4">
          {productDetails?.images && productDetails.images.length > 0 && (
            <Slider className="mx-2" {...settings}>
              {productDetails.images.map((src, index) => (
                <img
                  key={index}
                  className="w-full py-2 px-4 rounded-lg shadow-md"
                  src={src}
                  alt={productDetails.title}
                />
              ))}
            </Slider>
          )}
        </div>

        <div className="w-full md:w-3/4 px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{productDetails.title}</h2>
          <p className="text-gray-700 mb-4">{productDetails.description}</p>

          <ul className="flex list-none justify-between">
            <li>Brand: {productDetails.brand?.name}</li>
            <li>Category: {productDetails.category?.name}</li>
            <li>Sold: {productDetails.sold}</li>
          </ul>

          <div className="flex justify-between items-center mt-4">
            <span className="text-2xl font-semibold text-gray-900">
              {productDetails.price} EGP
            </span>
            <span>
              {productDetails.ratingsAverage} <i className="fas fa-star text-yellow-400"></i>
              <span className="text-sm text-gray-600">({productDetails.ratingsQuantity})</span>
            </span>
          </div>

          <div className="mt-4 w-full">
            <button onClick={()=>addProduct(productDetails._id)} className="bg-blue-700  hover:bg-blue-800 text-white font-medium w-full py-2 px-4 rounded-lg">
                {BtnLoading && CurrentID === productDetails._id ? <i className='fas fa-spinner fa-spin  text-center mx-auto '></i> : 'Add to cart' }
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8">
        {relatedProducts.length > 0 && (
          <Slider  {...settingss}>
            {relatedProducts.map((product) => (
              <Link
                to={`/productdetails/${product._id}/${product.category.name}`}
                key={product._id}
                className="w-full px-2"
              >
                <div className="text-center">
                  <img
                    src={product.imageCover}
                    alt={product.name}
                    className="w-full rounded-2xl p-1 m-3"
                  />
                  <h4 className="text-lg font-semibold mt-2">{product.title}</h4>
                </div>
              </Link>
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
}
