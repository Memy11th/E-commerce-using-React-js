import  {  useContext, useEffect, useState } from 'react'
import { CartContext } from '../../context/CartContext'


export default function AllOrders() {
  let {getOrders,ordersItems,setOrdersItems,getUserName,getUserDetails} = useContext(CartContext)
  let [isLoading,setIsLoading] = useState(false)
let Decoded = getUserDetails()
  async function getUserOrders(){
    setIsLoading(true)
    let Response = await getOrders();
    setOrdersItems(Response.data)
    setIsLoading(false)
  }

  let userName = getUserName();
  console.log(ordersItems)

  
  

    useEffect(()=>{
      getUserOrders()
    },[])

    if (isLoading) {
      return (
        <div className="min-h-screen flex justify-center items-center">
          <i className="fas fa-spinner animate-spin text-3xl text-blue-500"></i>
        </div>
      );
    }
  return <>
   <span className='font-bold m-3'>Hello <span className='font-bold text-gradient '>{userName}</span> , <br  /> <span className='m-8'>you have ({ordersItems.length}) undilivered orders</span> </span> 
 
  <div className=' shadow-xl rounded-xl   shadow-gray-600  py-3'>
    {ordersItems.map((order)=>(
      <div key={order._id} className=' my-5 rounded-xl shadow-md overflow-hidden p-3 bg-slate-100  w-3/4 mx-3 '>
        <div className='flex flex-wrap justify-between   '>

          <p className=''> Order id : <span className='text-blue-600'>#{order.id}</span>  </p>
        <span>Payment status : {order.isPaid ?  <span><span className='text-green-600 font-bold'>Paid</span> via <span className='font-bold'>{order.paymentMethodType}</span>  </span>    : <span className='text-yellow-500 font-bold'>Cash on delivery</span> } </span>  
        <span>Delivery status :  {order.isDelivered ? <span className='text-green-600 font-bold'>Delivered</span> : <span className='text-yellow-500 font-bold'>Delivering</span> }</span>

        </div>
          <div className='grid grid-cols-12 grid-flow-row gap-4'>

              {order.cartItems.map((item)=>(
 <div key={item._id}  className='  col-span-3 items-center justify-between shadow-2xl rounded-xl '>

   <img className=''  src={item.product.imageCover} alt={item.product.title} />

    
    <p className='text-center col-span-4 text-xs font-bold items-center' >{item.product.title}</p>
    </div>

))} 

          </div>
          <hr  className='my-2 mx-6 h-1 bg-gray-700 bg-opacity-45 rounded-3xl shadow-lg ' />

          <div className='flex flex-wrap justify-between'>

            <p className=' font-semibold '> Deliver to : {order.shippingAddress.details}-{order.shippingAddress.city}</p>
            <p className=' font-semibold '> Reciever's name : {userName}</p>
            <p className=' font-semibold '> Phone : {order.shippingAddress.phone}</p>
            <p className=' font-semibold '> Total price : {order.totalOrderPrice}</p>



          </div>

      
        </div>
    ))}

  </div>
  
  </>
}
