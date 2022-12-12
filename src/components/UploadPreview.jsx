import { Button, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

function UploadPreview(props) {
  const {buttonText, uploadAccept, uploadFile, file, imageDimensions} = props
  const [preview, setPreview] = useState('')

  useEffect(() => {
    let objectUrl
    if (!file) {
      setPreview('')
    }
    if (file) {
      objectUrl = URL.createObjectURL(file)
      setPreview(objectUrl)
    }
    return () => URL.revokeObjectURL(objectUrl)
  }, [file])

  return (
    <Stack className='upload-container'
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      maxWidth={400}
    >
      <Button
        variant="contained"
        component="label"
      >
        {buttonText}
        <input
          accept={uploadAccept}
          hidden
          onChange={(event) => uploadFile(event)}
          type="file"
        ></input>
      </Button>
      <Typography component="span" sx={{textDecoration: "underline"}}>
        <h4>Preview</h4>
      </Typography>
      <Typography component="span">
        {file ? <h3>{file.name}</h3> : <h3>No File Detected!</h3>}
      </Typography>
      {file ? <img 
        src={preview}
        alt="preview"
        style={{
          height: `${imageDimensions.height}px`,
          width: `${imageDimensions.width}px`,
          objectFit: "contain",
        }}
        ></img> : 
        <img
          src="/placeholder.png"
          alt="preview"
          style={{
            height: `${imageDimensions.height}px`,
            width: `${imageDimensions.width}px`,
            objectFit: "contain",
          }}
        >
        </img>}
        
    </Stack>
  )
}

export default UploadPreview