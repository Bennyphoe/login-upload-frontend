
import React from 'react'
import { Navigate, Outlet} from 'react-router-dom'

function ProtectedPublicRoute() {
    const user = localStorage.getItem('user')
    return !user ? <Outlet /> : <Navigate to="/home" replace={true}/> 
}

export default ProtectedPublicRoute