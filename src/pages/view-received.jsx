import React, { useEffect, useState } from 'react'
import { Box, Container, Typography } from '@mui/material'
import "../styles/view-sent-style.css"
import ImageWithDetails from '../components/ImageWithDetails'

function ViewReceived() {
  const [receivedFiles, setReceivedFiles] = useState([])
  const user = JSON.parse(localStorage.getItem("user"))
  const {id} = user
  useEffect(() => {
    fetch(`/files/received/${id}`)
    .then(response => {
      if (response.ok) return response.json()
      return Promise.reject(response)
    })
    .then(data => {
      setReceivedFiles(data)
    })
    .catch(response => {
      response.json().then(error => {
        console.log(error.message)
      })
    })
  }, [id])
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '30px'
      }}
    >
      <Typography mb={8} variant="h2">~ Received Photos ~</Typography>
      <Container className="image-grid">
        {/* Create galley Image component */}
        {receivedFiles.length > 0 ? receivedFiles.map(file => {
          const {receiver, sender} = file
          return (
            <ImageWithDetails imageClassName="gallery-img" imageSrc={`/files/${file.name}`} key={file.name} receiver={receiver} sender={sender} date={file.date} caption={file.caption}/>
          )
        }): <></>}
      </Container>
    </Box>
  )
}

export default ViewReceived