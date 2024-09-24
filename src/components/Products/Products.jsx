import React, { useContext, useEffect, useState } from 'react'
import style from './Products.module.css'
import { dataContext } from '../../context/dataContext';
import RecentProducts from '../RecentProducts/RecentProducts';
export default function Products() {


    let {index,setIndex}=useContext(dataContext)

    useEffect(()=>{
    },[])
    
   
  return <>
  <div className='flex flex-wrap items-center justify-center'>
  <RecentProducts/>  

  </div>
  
  </>
}
