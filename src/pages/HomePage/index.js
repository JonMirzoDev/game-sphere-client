import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Container, Typography, Box, Paper, Stack } from '@mui/material'
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
        <Stack mt={3} direction='column' spacing={2} alignItems='center'>
          <Button
            variant='contained'
            color='primary'
            onClick={() => handleGameSelect('tic-tac-toe')}
            className={styles.gameButton}
          >
            Play Tic-Tac-Toe
          </Button>
          <Button
            variant='contained'
            color='secondary'
            onClick={() => handleGameSelect('connect-four')}
            className={styles.gameButton}
          >
            Play Connect Four
          </Button>
        </Stack>
      </Box>
    </Container>
  )
}

export default HomePage
