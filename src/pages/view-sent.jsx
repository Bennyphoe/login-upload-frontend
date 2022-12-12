import { Box, Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
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
        justifyContent: 'center',
        alignItems: 'center',
        margin: '30px'
      }}
    >
      <Container className="image-grid">
        {/* Create galley Image component */}
        {sentFiles.length > 0 ? sentFiles.map(file => {
          return (
            <img src={`/files/${file.name}`} alt="placeholder" className='gallery-img' key={file.name}/>
          )
        }): <></>}
      </Container>
    </Box>
  )
}

export default ViewSent