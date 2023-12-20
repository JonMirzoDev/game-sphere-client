import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './style.module.scss'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { useParams } from 'react-router-dom'
import socket from '../../socket'

const GameLobby = () => {
  const { gameType } = useParams()
  const [sessions, setSessions] = useState([])
  const navigate = useNavigate()

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
    navigate(`/${gameType}/${sessionId}`)
  }

  return (
    <div className={styles.gameLobby}>
      <Typography variant='h4' gutterBottom>
        {gameType} Lobby
      </Typography>
      {sessions.length ? (
        sessions.map((session) => (
          <Card
            key={session.id}
            className={styles.sessionCard}
            onClick={() => onJoinSession(session.id)}
          >
            <CardContent>
              <Typography variant='h5'>{session.gameType}</Typography>
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
