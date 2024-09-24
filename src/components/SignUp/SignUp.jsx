import  { useContext, useEffect, useState } from 'react'
import {useFormik} from 'formik'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup';
import  { userContext } from '../../context/UserContext'






export default function SignUp() {

    const [apiError,setapiError]= useState('')
    const [isLoading,setIsLoading]= useState(false)
    let {setUserName,isLoggedIn} = useContext(userContext)


    let navigate = useNavigate();

    
   let validationSchema = yup.object().shape({
    name:yup.string().min(2,'Name is too short').max(20,'Name is too long').matches(/^[A-Z][a-z]*(\s[A-Z][a-z]*)*$/,'Name must start with a capital letter').required('Name is required'),
    email:yup.string().email().required('Email is required'),
    password:yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,'Password must at least contain 8 characters with at least on lowercase and uppercase letters and a number').required('password is required'),
    rePassword:yup.string().oneOf([yup.ref('password')]).required('passwords did not match '),
    phone: yup.string().required('Phone number is a must').matches(/^01\d{9}$/, 'Must be an Egyptian number (11 digits starting with 01)')  })

    

    let formik = useFormik({
      initialValues:{
        name:'',
        email:"",
        password:"",
        rePassword:"",
        phone:""

      },
      validationSchema ,
      onSubmit:handleRegister
    })


    function handleRegister(formikValues){
      setIsLoading(true);
      axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',formikValues)
      .then((apiResponse)=>{
        setUserName(apiResponse.data.user.name);
        setIsLoading(false);
        navigate('/login');
      })
      .catch((apiResponse)=>{
        setapiError(apiResponse?.response?.data.message);
        setIsLoading(false);
      })

    }

    useEffect(()=>{



    },[])
  return <>

<div className="container mx-auto py-8 ">
      <h1 className="text-2xl font-bold mb-6 text-center">Register Now</h1>
      <div>
	</div>
        <form onSubmit={formik.handleSubmit} className="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-2xl">
        {apiError? <p className="mt-2 text-sm text-center font-extrabold  text-red-600 dark:text-red-500"> {apiError}</p> : null}

        <div className="mb-3">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            type="text" id="name" name="name" placeholder="Ahmed Muhammed" />
            <p className="mt-2 text-sm text-red-600 dark:text-red-500">{formik.errors.name && formik.touched.name ? formik.errors.name : null }</p>
        </div>
        <div className="mb-3">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Phone number</label>
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            type="text" id="phone" name="phone" placeholder="01*********" />
                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">{formik.errors.phone && formik.touched.phone ? formik.errors.phone : null }</p>

        </div>
        <div className="mb-3">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            type="email" id="email" name="email" placeholder="Ahmed@example.com" />  
           <p className="mt-2 text-sm text-red-600 dark:text-red-500">{formik.errors.email && formik.touched.email ? formik.errors.email : null }</p>

            
        </div>
        <div className="mb-3">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            type="password" id="password" name="password" placeholder="********" />
           <p className="mt-2 text-sm text-red-600 dark:text-red-500">{formik.errors.password && formik.touched.password ? formik.errors.password : null }</p>

        </div>
        <div className="mb-3">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rePassword">Confirm Password</label>
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            type="password" id="rePassword" name="rePassword" placeholder="********" />
<p className="mt-2 text-sm text-red-600 dark:text-red-500">{formik.errors.rePassword && formik.touched.rePassword ? formik.errors.rePassword : null }</p>

        </div>
        <button
          className="w-full bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
          type="submit">
            
            {isLoading?<i className='fa-spinner fa-spin fas'></i>:'Register'}
            </button>
            <Link className=' underline decoration-sky-500 ' to={'/login'}> <span className='text-sky-600'>Already have an account ? login</span></Link>
      </form>
    </div>


</>
}

/*
<form onSubmit={formik.handleSubmit} className='bg-red-800' >
<div className="mb-3 mx-3 text-center flex bg-red-700 container ">
<div className='bg-slate-300'>
  {apiError}
</div>

<label htmlFor="name" className="form-label">Enter Your name</label>

  <div className="flex ">
  <input name='name' onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" className="form-control w-25 " id="name" aria-describedby="emailHelp"/>
  
  
  { formik.errors.name && formik.touched.name ? <p className='text-danger mx-1 my-auto fs-6'>{formik.errors.name}</p> : null  }
  </div>
  


  <label htmlFor="email" className="form-label">Email address</label>
  <input name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" className="form-control w-25 " id="email" aria-describedby="emailHelp"/>
  { formik.errors.email && formik.touched.email ? <p>{formik.errors.email}</p> : null  }
  <label htmlFor="phone" className="form-label">phone</label>
  <input name='phone' onChange={formik.handleChange} onBlur={formik.handleBlur} type="number" className="form-control w-25 " id="phone" aria-describedby="emailHelp"/>
  { formik.errors.phone && formik.touched.phone ? <p className='text-danger mx-1 my-auto fs-6'>{formik.errors.phone}</p> : null  }

  <label htmlFor="password" className="form-label">Enter your password</label>
  <input name='password' onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" className="form-control w-25 " id="password" aria-describedby="emailHelp"/>
  { formik.errors.password && formik.touched.password ? <p className='text-danger mx-1 my-auto fs-6'>{formik.errors.password}</p> : null  }

  <label htmlFor="rePassword" className="form-label">Re-enter your password</label>
  <input name='rePassword' onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" className="form-control w-25 " id="rePassword" aria-describedby="emailHelp"/>
  { formik.errors.rePassword && formik.touched.rePassword ? <p className='text-danger mx-1 my-auto fs-6'>{formik.errors.rePassword}</p> : null  }

  <button type="submit" className="btn my-3 btn-primary">
    {isLoading?<i className='fa-spinner fa-spin fas'></i>:'Submit'}
    
    </button>

</div>
 </form>

 <Link to={'/login'}> Go to fuckin hell dude</Link>
*/
