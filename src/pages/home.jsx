import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppBarCustom from '../components/AppBar'

function Home() {
  const [user, setUser] = useState({})
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    setUser(user)
  }, [])
  let navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem('user')
    navigate('/login')
  }
  return (
    <>
      <AppBarCustom logout={logout} name={user.name}/>    
    </>
  )
}

export default Home