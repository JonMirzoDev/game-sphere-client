// src/components/GameLobby.js
import React, { useEffect, useState } from 'react'
import socket from '../../socket'

const GameLobby = () => {
  const [sessions, setSessions] = useState([])

  useEffect(() => {
    socket.on('availableGames', (games) => {
      setSessions(games)
    })

    return () => {
      socket.off('availableGames')
    }
  }, [])

  return (
    <div>
      <h1>Game Lobby</h1>
      {sessions.map((session) => (
        <div key={session.id}>
          <p>
            {session.gameType} - {session.players.length}/2 players
          </p>
          {/* Add logic to join a game */}
        </div>
      ))}
    </div>
  )
}

export default GameLobby
