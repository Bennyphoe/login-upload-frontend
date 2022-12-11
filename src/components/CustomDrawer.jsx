import { Drawer } from '@mui/material'
import React from 'react'

function CustomDrawer(props) {
  const {anchor, toggleDrawer, open, content} = props
  return (
    <>
      <Drawer
        anchor={anchor}
        open={open}
        onClose={toggleDrawer(false)}
      >
        {content}
      </Drawer>
    </>
  )
}

export default CustomDrawer