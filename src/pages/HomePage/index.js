import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './style.module.scss'

const HomePage = () => {
  const navigate = useNavigate()

  const handleGameSelect = (gameType) => {
    navigate(`/lobby/${gameType}`)
  }

  return (
    <div>
      <h1>Welcome to the Gaming Platform</h1>
      <p>Select a game to play:</p>
      <button onClick={() => handleGameSelect('tic-tac-toe')}>
        Tic-Tac-Toe
      </button>
      {/* Add more games as needed */}
    </div>
  )
}

export default HomePage
