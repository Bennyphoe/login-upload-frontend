import React from 'react'
import LinearProgress from '@mui/material/LinearProgress';
import { Box } from '@mui/material';

function ProgressBar(props) {
  const {progress} = props
  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress variant="determinate" value={progress} />
    </Box>
  )
}

export default ProgressBar