import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import GameLobby from './components/GameLobby'
import TicTacToe from './components/TicTacToe'

const router = createBrowserRouter([
  {
    path: '/',
    element: <GameLobby />
  },
  {
    path: '/tic-tac-toe/:id',
    element: <TicTacToe />
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
