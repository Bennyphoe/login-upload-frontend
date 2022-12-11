import { Box, AppBar, Toolbar, IconButton, Typography } from '@mui/material'
import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';

function AppBarCustom(props) {
  const { logout, name, toggleDrawer } = props
  return (
    <Box sx={{ flowGrow: 1}}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            LONG DISTANCE PICTURES | Welcome {name}!
          </Typography>
          <IconButton onClick={logout}
          color="inherit"
          >
              <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default AppBarCustom