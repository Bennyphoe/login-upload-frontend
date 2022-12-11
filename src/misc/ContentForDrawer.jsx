import React from 'react'
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import PanoramaIcon from '@mui/icons-material/Panorama';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';

function ContentForDrawer(props) {
  const {toggleDrawer} = props
  const content = [
    {
      text: "Upload Photo",
      icon: () => {
        return (<FileUploadIcon />)
      },
      link: '/home'
    },
    {
      text: "View Sent Photos",
      icon: () => {
        return (<PanoramaIcon />)
      },
      link: '/view/sent'
    },
    {
      text: "View Received Photos",
      icon: () => {
        return (<VolunteerActivismIcon />)
      },
      link: '/view/received'
    }
  ]
  const list = () => {
    return (
      <Box
        sx={{width: 250}}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List>
          {content.map((content, index) => {
            return (
              <ListItem key={index} disablePadding>
                <ListItemButton component="a" href={content.link}>
                  <ListItemIcon>
                    {content.icon()}
                  </ListItemIcon>
                  <ListItemText primary={content.text}/>
                    
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>
      </Box>
    )
  }
  return (
    <>
      {list()}
    </>
  )
}

export default ContentForDrawer