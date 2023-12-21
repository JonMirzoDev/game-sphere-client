import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import socket from '../../socket'
import styles from './style.module.scss'
import { Button, Grid, Paper, Typography } from '@mui/material'

const TicTacToe = () => {
  const navigate = useNavigate()
  const { sessionId, playerId } = useParams()
  const [board, setBoard] = useState(Array(9).fill(null))
  const [playerSymbol, setPlayerSymbol] = useState(null)
  const [currentPlayer, setCurrentPlayer] = useState(null)
  const [hasJoined, setHasJoined] = useState(false)
  const [draw, setDraw] = useState(false)
  const [winner, setWinner] = useState(null)

  useEffect(() => {
    if (!hasJoined) {
      socket.emit('joinGame', { sessionId, playerId })
      setHasJoined(true)
    }

    socket.on('joinGameResponse', (response) => {
      if (response.status === 'success') {
        console.log('Joined game:', response.game)
        setBoard(response.game.gameState.board)
        setCurrentPlayer(response.game.gameState.currentPlayer)
        setPlayerSymbol(response.game.players.length === 1 ? 'X' : 'O')
      } else {
        console.log(response)
      }
    })

    socket.on('gameState', (gameState) => {
      setDraw(gameState?.draw)
      setWinner(gameState?.winner)
      setBoard(gameState.board)
      setCurrentPlayer(gameState.currentPlayer)
    })

    socket.on('exception', (error) => {
      console.error('Socket exception:', error)
    })

    return () => {
      socket.off('gameState')
      socket.off('exception')
      socket.off('joinGameResponse')
    }
  }, [sessionId, playerId, hasJoined])

  const handleCellClick = (index) => {
    if (board[index] || currentPlayer !== playerSymbol) {
      return
    }

    socket.emit('makeMove', {
      sessionId,
      playerId,
      position: index,
      playerSymbol
    })
  }

  const handleGoBack = () => {
    navigate('/')
  }

  return (
    <Paper elevation={3} className={styles.ticTacToe}>
      <Typography variant='h2' gutterBottom>
        Tic-Tac-Toe
      </Typography>
      <Grid container spacing={2} className={styles.board}>
        {board.map((cell, index) => (
          <Grid item xs={4} key={index}>
            <Button
              variant='outlined'
              className={styles.cell}
              onClick={() => handleCellClick(index)}
              disabled={currentPlayer !== playerSymbol}
              fullWidth
            >
              {cell || '-'}
            </Button>
          </Grid>
        ))}
      </Grid>
      {draw && (
        <Typography variant='h4' mt={4}>
          It's a draw!
        </Typography>
      )}
      {winner && (
        <Typography variant='h4' mt={4}>
          The winner is {winner}
        </Typography>
      )}
      <Button
        variant='contained'
        color='primary'
        onClick={handleGoBack}
        className={styles.goBackButton}
      >
        Go Back to Main Page
      </Button>
    </Paper>
  )
}

export default TicTacToe
