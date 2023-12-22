import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import GameLobby from './components/GameLobby'
import TicTacToe from './components/TicTacToe'
import HomePage from './pages/HomePage'
import ConnectFour from './components/ConnectFour'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/lobby/:gameType',
    element: <GameLobby />
  },
  {
    path: '/tic-tac-toe/:sessionId/:playerId',
    element: <TicTacToe />
  },
  {
    path: '/connect-four/:sessionId/:playerId',
    element: <ConnectFour />
  },
  {
    path: '*',
    element: <Navigate to='/' />
  }
])

function App() {
  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
