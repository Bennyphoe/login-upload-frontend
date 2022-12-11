import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button, TextField } from '@mui/material'
import '../styles/login-style.css'
import { Link, useNavigate } from 'react-router-dom'

function Login() {

  let navigate = useNavigate()

  const [error, setError] = useState('')
  const [userInfo, setUserInfo] = useState({})

  useEffect(() => {
    //once there is a change in userInfo, it means user is able to login
    if (Object.keys(userInfo).length > 0) {
      localStorage.setItem("user", JSON.stringify(userInfo))
      navigate('/home')
    }
  }, [userInfo, navigate])

  const onSubmit = async(values, actions) => {
    const credentials = {
      username: values.username,
      password: values.password
    }
    await loginUser(credentials)
    actions.resetForm()
  }


  const loginUser = async (credentials) => {
    fetch('users/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(credentials)
    })
    .then(response => {
      if (response.ok) {
        return response.json()
      }
      return Promise.reject(response)
    })
    .then(data => setUserInfo(data))
    .catch(response => {
      response.json().then(json => {
        setError(json.message)
      })
    })
  }

  const {handleChange, handleBlur, isSubmitting, handleSubmit, errors, touched, values} = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: Yup.object({
      username: Yup.string().required(),
      password: Yup.string().required()
    }),
    onSubmit
  })
  return (
    <div className="container">
      <h1 style={{textAlign: "center"}}>Long Distance Pictures</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <TextField 
          label="Username" 
          variant="outlined" 
          name="username"
          onChange={handleChange} 
          onBlur={handleBlur} 
          value={values.username}
          error={errors.username && touched.username}
          helperText={(touched.username && errors.username) ? errors.username : ''}
          fullWidth={true}>
        </TextField>
        <TextField 
          fullWidth={true}
          label="Password" 
          variant="outlined" 
          name="password"
          onChange={handleChange} 
          onBlur={handleBlur} 
          value={values.password}
          error={errors.password && touched.password}
          helperText={(touched.password && errors.password) ? errors.password : ''}>
        </TextField>
        <p>
          Don't have an account? <Link to="/register">Register</Link> Here!
        </p>
        {/* Submit button */}
        <Button variant="contained" disabled={isSubmitting} type="submit" className='submitButton'>
          Submit
        </Button>
        <h4 style={{color: "red"}}>{error}</h4>
      </form>
    </div>
  )
}

export default Login