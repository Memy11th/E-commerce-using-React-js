import  { useContext, useEffect, useState } from 'react'
import logo from '../../assets/react.svg'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free';
import  { userContext } from '../../context/UserContext';
import { CartContext } from '../../context/CartContext';
import toast from 'react-hot-toast';
import { WishlistContext } from '../../context/WishlistContext';


export default function NavBar() {

    let {isLoggedIn,setIsLoggedIn,setUserToken} = useContext(userContext);
   let {CartNumber,animate,getCartItemsNumber,setCartNumber} = useContext(CartContext)
    let Navigate = useNavigate();
    let {wishlistNum,getWishlistNum,setWishlistNum} = useContext(WishlistContext);




    
    useEffect(()=>{
     getCartItemsNumber();
     getWishlistNum();

  },[CartNumber,wishlistNum]);

    function HandleLogout() {
      setCartNumber(0)
      setWishlistNum(0);
        setIsLoggedIn(false);
        localStorage.removeItem('UserToken')
        setUserToken(null)
        Navigate('/register');
        toast.success('You are logged out  ',{
          duration:2000,
    
        })
        
    }
  return <>

  
  
  <nav className=' bg-slate-200 bg-opacity-90 w-full z-50  lg:sticky top-0 left-0 right-0 '>
    <div className=" flex  my-auto justify-between px-5 py-2 ">
      <div className=' flex my-auto'>
        <img className='my-auto mx-2' height={35} src={logo} alt="react logo" />
        <h3 className='my-auto mx-2 font-bold'> <Link to={'/'}>Prime</Link> </h3>
        <ul className='flex my-auto mx-2'>
          {!isLoggedIn ? null:<>
            <li> <NavLink className='me-2 ' to={'/'} >Home</NavLink> </li>
          <li><NavLink className='me-2' to={'products'} >Products</NavLink></li>
          <li><NavLink className='me-2' to={'allorders'} >Orders</NavLink></li>
          </>}
          


        </ul>
      </div>



      <div className='my-auto'>

          
          
          {!isLoggedIn? <ul className='my-auto flex gap-3'><li className='my-auto'><Link className='' to={'/'} >Register/Log in</Link></li> </ul>: (
          <ul className='my-auto flex gap-3'>
            <li className='relative'>
            <Link className='me-2 ' to={'wishlist'} >
          <i className="fa-solid  fa-heart text-lg  hover:text-red-700 hover:scale-105 hover:animate-pulse   transition-all duration-200 "></i>
       {wishlistNum !== 0  && wishlistNum ? ( <span
          className={`transition-all font-bold absolute translate-x-50 -translate-y-1/3 top-0 right-0 transform ease-linear duration-800 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center ${
            animate ? " scale-0" : "scale-100"
          }`}
        >
          {wishlistNum}
        </span>) : null }  
         
</Link>
            </li>
             <li className='relative'><Link className='me-2 ' to={'cart'} >
          <i className="fa-solid  fa-cart-shopping hover:text-green-700 text-lg hover:rotate-3  hover:-translate-x-1 transition-all duration-200 "></i>
       {CartNumber !== 0  && CartNumber ? ( <span
          className={`transition-all font-bold absolute  translate-x-50 -translate-y-1/2 top-0 right-0 transform ease-linear duration-800 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center ${
            animate ? " scale-0" : "scale-100"
          }`}
        >
          {CartNumber }
        </span>) : null }  
         
</Link>
</li>
          <li className='my-auto'>  <button onClick={HandleLogout}><Link className='' to={'register'} >Logout</Link></button>   </li> 

          </ul> )}
          
        
         
      </div>
    </div>
  </nav>
  </>
}
