import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Card, CardContent, Typography } from '@mui/material'
import styles from './style.module.scss'
import socket from '../../socket'
import { getPlayerId } from '../../utils'

const GameLobby = () => {
  const { gameType } = useParams()
  const [sessions, setSessions] = useState([])
  const navigate = useNavigate()
  const playerId = getPlayerId()

  useEffect(() => {
    socket.emit('requestSessions', { gameType })

    socket.on('availableGames', (games) => {
      setSessions(games.filter((game) => game.gameType === gameType))
    })

    return () => {
      socket.off('availableGames')
    }
  }, [gameType])

  const onJoinSession = (sessionId) => {
    navigate(`/${gameType}/${sessionId}/${playerId}`)
  }

  return (
    <div className={styles.gameLobby}>
      <Typography variant='h4' gutterBottom>
        {gameType.toUpperCase()} Lobby
      </Typography>
      {sessions.length > 0 ? (
        sessions.map((session) => (
          <Card
            key={session.id}
            className={styles.sessionCard}
            onClick={() => onJoinSession(session.id)}
          >
            <CardContent>
              <Typography variant='h5'>
                {session.gameType.toUpperCase()}
              </Typography>
              <Typography color='textSecondary'>
                Players: {session.players.length}/2
              </Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant='h6'>
          No available sessions. Please wait or create a new session.
        </Typography>
      )}
    </div>
  )
}

export default GameLobby
