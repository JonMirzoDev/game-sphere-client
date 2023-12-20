import React from 'react'
import styles from './style.module.scss'
import Paper from '@mui/material/Paper'

const TicTacToeBoard = ({ board, onCellClick }) => {
  return (
    <Paper elevation={3} className={styles.ticTacToeBoard}>
      {board &&
        board.map((cell, index) => (
          <div
            key={index}
            className={styles.cell}
            onClick={() => onCellClick(index)}
          >
            {cell}
          </div>
        ))}
    </Paper>
  )
}

export default TicTacToeBoard
