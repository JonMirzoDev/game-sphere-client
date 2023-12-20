import React from 'react'
import styles from './style.module.scss'
import Typography from '@mui/material/Typography'

const PlayerStatus = ({ currentPlayer, winner }) => {
  return (
    <div className={styles.playerStatus}>
      <Typography className={styles.statusText} color='primary'>
        {winner ? `Winner: ${winner}` : `Current Player: ${currentPlayer}`}
      </Typography>
    </div>
  )
}

export default PlayerStatus
