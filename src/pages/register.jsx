import { TextField, Button } from '@mui/material'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import '../styles/register-style.css'
import SnackBar from '../components/SnackBar'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link } from 'react-router-dom'

function Register() {

  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [openNotification, setOpenNotification] = useState(false)

  const onSubmit = async(values, actions) => {
    const {name, username, password} = values
    const newUserDetails = {
      name,
      username,
      password
    }
    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUserDetails)
    }).then(response => {
      if (response.ok) {
        return response.json()
      }
      return Promise.reject(response)
    }).then(data => {
      setSuccessMessage('You have successful created an account, head back to login screen!')
      setOpenNotification(true)
      setError('')
      actions.resetForm()
    }).catch(response => {
      response.json().then(json => {
        setError(json.message)
      })
    })
  }
  const handleClose = () => {
    setOpenNotification(false)
  }
  const {handleSubmit, handleBlur, touched, errors, handleChange, values, resetForm} = useFormik({
    initialValues: {
      name: '',
      username: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      username: Yup.string().email("Please enter a valid email").required(),
      password: Yup.string().min(5).required(),
      confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords don't match!").required()
    }),
    onSubmit,
  })
  return (
    <>
      <div className='container'>
        <h1>Register</h1>
        <form className='form-container' onSubmit={handleSubmit}>
          <TextField
            label="name"
            name="name"
            value={values.name}
            variant="outlined"
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.name && touched.name}
            helperText={(touched.name && errors.name) ? errors.name : ''}
          ></TextField>
          <TextField
            label="username"
            name="username"
            value={values.username}
            variant="outlined"
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.username && touched.username}
            helperText={(touched.username && errors.username) ? errors.username : ''}
          ></TextField>
          <TextField
            label="password"
            name="password"
            value={values.password}
            variant="outlined"
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password && touched.password}
            helperText={(touched.password && errors.password) ? errors.password : ''}
          ></TextField>
          <TextField
            label="confirm password"
            name="confirmPassword"
            value={values.confirmPassword}
            variant="outlined"
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.confirmPassword && touched.confirmPassword}
            helperText={(touched.confirmPassword && errors.confirmPassword) ? errors.confirmPassword : ''}
          ></TextField>
          {error ? <p style={{color: 'red'}}>{error}</p> : <></>}
          <section className="btn-group">
          <Button component={Link} to="/login" startIcon={<ArrowBackIosIcon />}>
            Back
          </Button>
            <Button type="reset" className="reset-btn" variant="contained" onClick={resetForm} color="secondary">
              Reset
            </Button>
            <Button type="submit" className="submit-btn" variant="contained">
              Submit
            </Button>
          </section>
        </form>
      </div>
      <SnackBar 
        open={openNotification}
        handleClose={handleClose}
        severity='success'
        message={successMessage}
      />
    </>
    
  )
}

export default Register