import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { userContext } from '../../context/UserContext'



export default function ProtectedRoute(props) {

  if(localStorage.getItem('UserToken') !== null){
    return props.children
  }else {
   return <Navigate to={'/register'}/>

  }
}
