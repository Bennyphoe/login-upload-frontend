import { Box, Container, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ImageWithDetails from '../components/ImageWithDetails'
import "../styles/view-sent-style.css"

function ViewSent() {
  const [sentFiles, setSentFiles] = useState([])
  const user = JSON.parse(localStorage.getItem("user"))
  const {id} = user
  useEffect(() => {
    fetch(`/files/sent/${id}`)
    .then(response => {
      if (response.ok) return response.json()
      return Promise.reject(response)
    })
    .then(data => {
      setSentFiles(data)
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
      <Typography mb={8} variant="h2">~ Sent Photos ~</Typography>
      <Container className="image-grid">
        {/* Create galley Image component */}
        {sentFiles.length > 0 ? sentFiles.map(file => {
          const {receiver, sender} = file
          return (
            <ImageWithDetails imageClassName="gallery-img" imageSrc={`/files/${file.name}`} key={file.name} receiver={receiver} sender={sender} date={file.date} caption={file.caption}/>
          )
        }): <></>}
      </Container>
    </Box>
  )
}

export default ViewSent