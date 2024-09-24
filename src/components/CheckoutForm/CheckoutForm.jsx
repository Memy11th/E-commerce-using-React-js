import { useFormik } from 'formik'
import{ useContext, useEffect } from 'react'
import { CartContext } from '../../context/CartContext'

export default function CheckoutForm() {


let {CheckOutSession,CartId,setCartId,getUserCart} = useContext(CartContext);

async function getCart(){
  let Response = await getUserCart();
  setCartId(Response.data.data._id);

}

let formik = useFormik({
  initialValues : {
      details: "",
        phone: "",
        city: ""
  },
  onSubmit:()=>handleSubmit(CartId ,'http://localhost:5173')
})

// function to handle submit
async function handleSubmit( CartId ,url){
    let Response = await CheckOutSession(CartId ,url , formik.values);
    console.log(Response)
    if(Response.data.status === 'success') {
      window.location.href = Response.data.session.url

    }
}


    
    useEffect(()=>{
      getCart();
    },[])
  return <>

<div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Checkout now</h1>
      <form className="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-2xl" onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="details">Address</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.details}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            type="text"
            id="details"
            name="details"
            placeholder="25 Apt. , 22 St , City , Country"
          />
         
        </div>
        
        <div className="mb-3">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">Phone</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            type="text"
            id="phone"
            name="phone"
            placeholder="01*********"
          />
         
        </div>

        <div className="mb-3">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">City</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.city}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            type="text"
            id="city"
            name="city"
            placeholder="Alexandria,Egypt"
          />
         
        </div>

       

        <button
          className="w-full bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
          type="submit"
        >
          Pay now
        </button>

       
      </form>
    </div>
  
  
  </>
}
