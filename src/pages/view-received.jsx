import React, { useEffect, useState } from 'react'
import { Box, Container } from '@mui/material'
import "../styles/view-sent-style.css"

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
        justifyContent: 'center',
        alignItems: 'center',
        margin: '30px'
      }}
    >
      <Container className="image-grid">
        {/* Create galley Image component */}
        {receivedFiles.length > 0 ? receivedFiles.map(file => {
          return (
            <img src={`/files/${file.name}`} alt="placeholder" className='gallery-img' key={file.name}/>
          )
        }): <></>}
      </Container>
    </Box>
  )
}

export default ViewReceived