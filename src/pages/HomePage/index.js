import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Container, Typography, Box, Paper } from '@mui/material'
import styles from './style.module.scss'

const HomePage = () => {
  const navigate = useNavigate()

  const handleGameSelect = (gameType) => {
    navigate(`/lobby/${gameType}`)
  }

  return (
    <Container component={Paper} elevation={12} className={styles.homePage}>
      <Box my={8} textAlign='center'>
        <Typography variant='h2' gutterBottom>
          Gaming Sphere
        </Typography>
        <Typography variant='subtitle1' gutterBottom>
          Please select a game to play:
        </Typography>
        <Box mt={3}>
          <Button
            variant='contained'
            color='primary'
            size='large'
            onClick={() => handleGameSelect('tic-tac-toe')}
            className={styles.gameButton}
          >
            Play Tic-Tac-Toe
          </Button>
          {/* Placeholder for other game buttons */}
          {/* You can add more games and buttons here */}
        </Box>
      </Box>
    </Container>
  )
}

export default HomePage
