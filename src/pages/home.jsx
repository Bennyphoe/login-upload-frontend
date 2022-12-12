import { Box, Stack } from '@mui/material'
import React, { useState } from 'react'
import SnackBar from '../components/SnackBar'
import UploadForm from '../components/UploadForm'
import UploadPreview from '../components/UploadPreview'
import axios from "axios"


function Home() {
  const [file, setFile] = useState(null)
  const [error, setError] = useState('')
  const [progress, setProgress] = useState(0)
  const [successMessage, setSuccessMessage] = useState('')
  const [openNotification, setOpenNotification] = useState(false)
  const user = JSON.parse(localStorage.getItem('user'))
  const {id} = user


  const uploadFile = (event) => {
    const uploadedFile = event.target.files[0]
    setFile(uploadedFile)
  }

  const handleClose = () => {
    setOpenNotification(false)
  }

  const uploadToServer = (caption, receiverId, receiverName) => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("caption", caption)
    formData.append("userId", id)
    formData.append("receipientId", receiverId)
    console.log(formData)
    axios.post('files', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: progressEvent => {
        const {loaded, total} = progressEvent
        setProgress(parseInt(Math.round((loaded * 100) / total)))
      }
    }).then(response => {
      console.log(response.data)
      setSuccessMessage(`You Photo has been successfully uploaded and sent to: ${receiverName}!`)
      setOpenNotification(true)
      setFile(null)
      setError('')
      setTimeout(() => setProgress(0), 3000)
    }).catch(error => {
      const errorMessage = error.response.data.message
      setError(errorMessage)
    })
  }
  
  return (
    <>
      <Box sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          height={800}
          width={800}
          spacing={3}
        >
          <UploadPreview 
            buttonText="Upload Image"
            uploadAccept="image/*"
            uploadFile={uploadFile}
            file={file}
            imageDimensions={{height: 300, width: 300}}
          />
          <UploadForm
            uploadToServer={uploadToServer}
            error={error}
            hasFile={file ? true : false}
            progress={progress}
          >
          </UploadForm>
        </Stack>
        

      </Box>
      
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