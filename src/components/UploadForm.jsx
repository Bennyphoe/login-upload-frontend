import { Box, Button, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import ProgressBar from './ProgressBar'

function UploadForm(props) {
  const {uploadToServer, error, hasFile, progress} = props
  const [receiverError, setReceiverError] = useState('')



  const onSubmit = async(values, actions) => {
    const {caption, receipient} = values
    let receiverId
    let receiverName
    //check if its a valid receipient
    fetch(`/users/username/${receipient}`)
    .then(response => {
      if (response.ok) return response.json()
      return Promise.reject(response)
    })
    .then(async data => {
      const {id, name} = data
      receiverId = id
      receiverName = name
      await uploadToServer(caption, receiverId, receiverName)
      actions.resetForm()
      setReceiverError('')
    }).catch(response => {
      response.json().then(error => {
        setReceiverError(error.message)
      })
    })
  }

  const {handleChange, handleBlur, isSubmitting, handleSubmit, errors, touched, values} = useFormik({
    initialValues: {
      receipient: '',
      caption: ''
    },
    validationSchema: Yup.object({
      receipient: Yup.string().required(),
      caption: Yup.string().required()
    }),
    onSubmit
  })
  
  return (
    <Box sx={{maxWidth: 400}}>
      <form onSubmit={handleSubmit}>
        <Stack
          direction="column"
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          <TextField 
            label="Receipient"
            variant="outlined" 
            name="receipient"
            onChange={handleChange} 
            onBlur={handleBlur} 
            value={values.receipient}
            error={errors.receipient && touched.receipient}
            helperText={(touched.receipient && errors.receipient) ? errors.receipient : ''}
            fullWidth={true}>
          </TextField>
          {receiverError ? <h4 style={{color: "red"}}>{receiverError}</h4> : <></>}
          <TextField 
            fullWidth={true}
            label="Caption" 
            variant="outlined" 
            name="caption"
            multiline
            rows={4}
            maxrow={8}
            onChange={handleChange} 
            onBlur={handleBlur} 
            value={values.caption}
            error={errors.caption && touched.caption}
            helperText={(touched.caption && errors.caption) ? errors.caption : ''}>
          </TextField>
          {/* Progress Bar */}
          <ProgressBar 
            progress={progress}
          />
          {/* Submit button */}
          <Button fullWidth={true} variant="contained" disabled={isSubmitting || !hasFile} type="submit">
            Submit
          </Button>
          <h4 style={{color: "red"}}>{error}</h4>
        </Stack>
      </form>
    </Box>
    
  )
}

export default UploadForm