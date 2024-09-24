import  { useContext, useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import  { userContext } from '../../context/UserContext'
import toast from 'react-hot-toast';
import { CartContext } from '../../context/CartContext';
import { WishlistContext } from '../../context/WishlistContext';

export default function LogIn() {
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  let {setUserToken,setIsLoggedIn} = useContext(userContext);
  let {getCartItemsNumber,cartNumber} = useContext(CartContext)
  let {getWishlistNum} = useContext(WishlistContext);



  let navigate = useNavigate();

  function handleLogin(formikValues) {
    setIsLoading(true)
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', formikValues)
      .then((apiResponse) => {
        localStorage.setItem('UserToken',apiResponse.data.token);
        setUserToken(apiResponse.data.token);
        setIsLoading(false);
        setIsLoggedIn(true);
        getCartItemsNumber();
        getWishlistNum();

        navigate('/');
        toast.success('You are logged in successfully ',{
          duration:2000,
    
        })
        

        
      })
      .catch((apiResponse) => {
        setIsLoading(false)
        setApiError(apiResponse?.response?.data?.message);
      });
  }

  let validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      'Password must contain at least 8 characters, one uppercase, one lowercase, and one number'
    ).required('Password is required'),
  });

  let formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: handleLogin,
    validationSchema
  });

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Login Now</h1>
      <form className="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-2xl" onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            type="email"
            id="email"
            name="email"
            placeholder="Ahmed@example.com"
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
          ) : null}
        </div>
        
        <div className="mb-3">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            type="password"
            id="password"
            name="password"
            placeholder="********"
          />
          {formik.errors.password && formik.touched.password ? (
            <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
          ) : null}
        </div>

        {apiError && (
          <div className="text-red-500 text-sm mb-3">{apiError}</div>
        )}

        <button
          className="w-full bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
          type="submit"
        >
         {isLoading? <i className='fa-spinner fa-spin fas'></i> : 'Log in'}
        </button>

        <Link className="underline decoration-sky-500 mt-3 inline-block" to="/">
          <span className="text-sky-600">Donot have an account? Register now!</span>
        </Link>
      </form>
    </div>
  );
}
