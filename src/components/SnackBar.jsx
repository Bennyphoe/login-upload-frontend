import { Alert, Snackbar } from '@mui/material'
import React from 'react'

function SnackBar(props) {
  const {open, handleClose, severity, message} = props
  return (
    <Snackbar open={open} 
    autoHideDuration={6000} 
    onClose={handleClose}
    anchorOrigin={{vertical:'top', horizontal:'right'}}
    >
      <Alert
      severity={severity}
      sx={{width: '100%'}}
      onClose={handleClose}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}

export default SnackBar