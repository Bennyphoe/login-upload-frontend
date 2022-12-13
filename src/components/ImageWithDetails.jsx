import { Divider, Typography } from '@mui/material'
import React from 'react'
import "../styles/view-sent-style.css"

function ImageWithDetails(props) {
  const {imageSrc, caption, receiver, sender, date, imageClassName} = props
  return (
    <div style={{display: 'flex', flexDirection:"column"}}>
      <img src={imageSrc} className={imageClassName} alt="placeholder"></img>
      <div className='card-detail-container'>
        {/* caption */}
        <div className='caption'>{caption}</div>
        <Divider />
        {/* Receiver/Sender */}
        {receiver && <Typography variant="subtitle1">Sent to: {receiver.name}</Typography>}
        {sender && <Typography variant="subtitle1">Sent by: {sender.name}</Typography>}
        {/* Date Sent/Received */}
        <Typography variant='subtitle2'>date: {new Date(date).toLocaleString()}</Typography>
      </div>
    </div>
  )
}

export default ImageWithDetails