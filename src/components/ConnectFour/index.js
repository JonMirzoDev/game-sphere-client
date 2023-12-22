import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import socket from '../../socket'
import styles from './style.module.scss'
import { Button, Typography, Paper } from '@mui/material'

const ConnectFour = () => {
  const { sessionId, playerId } = useParams()
  const navigate = useNavigate()
  const [board, setBoard] = useState(
    Array(6)
      .fill()
      .map(() => Array(7).fill(null))
  )
  const [currentPlayer, setCurrentPlayer] = useState(null)
  const [playerSymbol, setPlayerSymbol] = useState(null)
  const [winner, setWinner] = useState(null)
  const [draw, setDraw] = useState(false)
  const [hasJoined, setHasJoined] = useState(false)
  const [players, setPlayers] = useState([])

  useEffect(() => {
    if (!hasJoined) {
      socket.emit('joinGame', { sessionId, playerId })
      setHasJoined(true)
    }

    socket.on('joinGameResponse', (response) => {
      if (response.status === 'success') {
        const { game } = response
        setBoard(game.gameState.board)
        setCurrentPlayer(game.gameState.currentPlayer)
        setPlayers(game.players)
        const player = game.players.find((p) => p.id === playerId)
        setPlayerSymbol(player?.symbol)
      } else {
        console.error('Error joining game:', response.message)
      }
    })

    socket.on('gameState', (gameState) => {
      setBoard(gameState.board)
      setCurrentPlayer(gameState.currentPlayer)
      setWinner(gameState.winner)
      setDraw(gameState.draw)
    })

    return () => {
      socket.off('gameState')
      socket.off('joinGameResponse')
    }
  }, [sessionId, playerId, hasJoined])

  const getPlayerSymbol = () => {
    const player = players.find((p) => p.id === playerId)
    return player ? player.symbol : null
  }

  const handleColumnClick = (columnIndex) => {
    console.log('columnIndex: ', columnIndex)
    if (currentPlayer === playerSymbol && !winner && !draw) {
      socket.emit('makeMove', {
        sessionId,
        playerId,
        position: columnIndex
      })
    }
  }

  const renderDisc = (cell) => {
    if (!cell) return null
    const color = cell === 'R' ? styles.red : styles.yellow
    return <div className={`${styles.disc} ${color}`}></div>
  }

  const renderBoard = () => {
    return (
      <div className={styles.boardContainer}>
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.row}>
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={styles.cell}
                onClick={() => handleColumnClick(colIndex)}
              >
                {renderDisc(cell)}
              </div>
            ))}
          </div>
        ))}
      </div>
    )
  }

  return (
    <Paper elevation={3} className={styles.connectFour}>
      <Typography variant='h4' align='center' gutterBottom>
        Connect Four
      </Typography>
      <Typography variant='h5' align='center' gutterBottom>
        Current Player:{' '}
        {getPlayerSymbol() === currentPlayer ? 'Your turn' : "Opponent's turn"}
      </Typography>
      {winner && (
        <Typography variant='h6' align='center' gutterBottom>
          Winner: {winner === playerSymbol ? 'You win!' : 'Opponent wins!'}
        </Typography>
      )}
      {draw && (
        <Typography variant='h6' align='center' gutterBottom>
          It's a draw!
        </Typography>
      )}
      <div className={styles.boardContainer}>{renderBoard()}</div>
      <Button
        variant='contained'
        color='primary'
        onClick={() => navigate('/')}
        className={styles.newGameButton}
      >
        New Game
      </Button>
    </Paper>
  )
}

export default ConnectFour
