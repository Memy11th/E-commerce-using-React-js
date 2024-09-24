
import  { createContext,  useContext,  useEffect, useState } from 'react'
import { CartContext } from './CartContext';
//import { jwtDecode } from "jwt-decode";

export let userContext = createContext()
export default function UserContextProvider(props) {

    const[UserToken,setUserToken]=useState(null);
    const[userName,setUserName] = useState('');
    const[isLoggedIn,setIsLoggedIn] = useState(false);


    useEffect(()=>{

      

      if(localStorage.getItem('UserToken') !== null){
        setUserToken(localStorage.getItem('UserToken'))
        setIsLoggedIn(true);
       
      }

    },[/*CartNumber*/])
  return (
   <userContext.Provider value={{UserToken,setUserToken,userName,setUserName,isLoggedIn,setIsLoggedIn}}>
    {props.children}
   </userContext.Provider>
  )
}
