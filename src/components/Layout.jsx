import React, { useState, useEffect } from 'react'
import ContentForDrawer from '../misc/ContentForDrawer'
import AppBarCustom from './AppBar'
import CustomDrawer from './CustomDrawer'
import { Outlet, useNavigate } from 'react-router-dom'


function Layout() {
  const [open, setOpen] = useState(false)
  const anchor = "left"

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpen(open)
  }

  //App bar
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
    // Top App Bar
    <>
      {/* App bar */}
      <AppBarCustom logout={logout} name={user.name} toggleDrawer={toggleDrawer}/>
      {/* Left Drawer */}
      <CustomDrawer
        content= {<ContentForDrawer toggleDrawer={toggleDrawer}/>}
        anchor={anchor}
        open={open}
        toggleDrawer={toggleDrawer}
      ></CustomDrawer>
      <Outlet/>
    </>
    
  )
}

export default Layout