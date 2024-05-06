import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import HomeScreen from './pages/HomeScreen'
import { render } from 'preact'

const router = createBrowserRouter([
  {
    path: '/:term?',
    element: <HomeScreen />,
  },
])

const App = () => <RouterProvider router={router} />

render(<App />, document.getElementById('app')!)
