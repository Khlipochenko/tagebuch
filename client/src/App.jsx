import Calendar from 'react-calendar'
import { RouterProvider } from 'react-router-dom'
import { router } from './utils/router'
function App() {

  return (
    <RouterProvider router={router}>
    <>
    <div>
  <Calendar></Calendar></div>
    </>
    </RouterProvider>
  )
}

export default App
