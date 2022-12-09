
import React from 'react'
import { Navigate} from 'react-router-dom'

function ProtectedPublicRoute() {
    const user = localStorage.getItem('user')
    return !user ? <Navigate to="/login" replace={true}/> : <Navigate to="/home" replace={true}/> 
}

export default ProtectedPublicRoute