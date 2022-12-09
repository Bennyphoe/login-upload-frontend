import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedPrivateRoute() {
  const user = localStorage.getItem('user') 
  return user ? <Outlet /> : <Navigate to="/login" replace={true}/>
}

export default ProtectedPrivateRoute