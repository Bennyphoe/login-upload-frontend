import { Button, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React, { useEffect, useState } from 'react'
import SnackBar from '../components/SnackBar'


function Home() {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState('')
  const [savedImageSrc, setSavedImagedSrc] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [openNotification, setOpenNotification] = useState(false)
  const user = JSON.parse(localStorage.getItem('user'))
  const {id} = user

  useEffect(() => {
    let objectUrl
    if (file) {
      objectUrl = URL.createObjectURL(file)
      setPreview(objectUrl)
    }
    return () => URL.revokeObjectURL(objectUrl)
  }, [file])

  const uploadFile = (event) => {
    const uploadedFile = event.target.files[0]
    setFile(uploadedFile)
  }

  const handleClose = () => {
    setOpenNotification(false)
  }

  const uploadToServer = () => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("caption", '')
    formData.append("userId", id)
    fetch('files', {
      body: formData,
      method: "POST"
    }).then(response => {
      if (response.ok) return response.json()
      return Promise.reject(response)
    }).then(data => {
      setSavedImagedSrc(data.key)
      setSuccessMessage('You Photo has been successfully uploaded!')
      setOpenNotification(true)
      setFile(null)
      setPreview('')
    }).catch(response => {
      response.then(error => {
        console.log(error.message)
      })
    })
  }
  
  return (
    <>
      <Stack className='upload-container' 
      direction="column" 
      justifyContent="center" 
      alignItems="center"
      marginTop={30} 
      spacing={2}>
        <Button
          variant="contained"
          component="label"
        >
          Upload Photo
          <input
            accept="image/*"
            hidden
            onChange={(event) => uploadFile(event)}
            type="file"
          ></input>
        </Button>
        <Typography component="span">
          <h4 style={{display: 'inline'}}>Preview</h4> {file ? file.name: ''}
        </Typography>
        {file ? <img style={{height: 300, width: 300}} src={preview} alt="PREVIEW"/> : <></>}
        <Button variant="contained" onClick={uploadToServer}>
          Submit
        </Button>
        {savedImageSrc ? <img 
        style={{height: 300, width: 300}} 
        src={`files/${savedImageSrc}`} 
        alt="Saved"/> 
        : <></>}
      </Stack>
      <SnackBar 
        open={openNotification}
        handleClose={handleClose}
        severity='success'
        message={successMessage}
      />
    </>
  )
}

export default Home