
import { createContext, useState } from 'react'



export let dataContext = createContext(0)


export default function DataContextProvider(props) {

    const[index,setIndex] = useState(0)
    const[BaseURL,setBaseURL] = useState('https://ecommerce.routemisr.com')
  return (
    <dataContext.Provider value={{index,setIndex,BaseURL,setBaseURL}}>
{props.children}
    </dataContext.Provider>
  )
}
