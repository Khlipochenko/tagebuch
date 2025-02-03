import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AppContextProvider } from './context/AppContext.jsx'
import {GoogleOAuthProvider} from '@react-oauth/google'
import { RouterProvider } from 'react-router-dom'
import { router } from './utils/router.jsx'

const CLIENT_ID=import.meta.env.VITE_CLIENT_ID

console.log(CLIENT_ID);
if (!CLIENT_ID) {
  throw new Error("client id fehlt")
}
createRoot(document.getElementById('root')).render(

 
  <GoogleOAuthProvider clientId={CLIENT_ID}>
  <AppContextProvider>
  <RouterProvider router={router}>
  
 
  <StrictMode>
    <App />
  </StrictMode>
  </RouterProvider>
  </AppContextProvider>
 
  </GoogleOAuthProvider>
  

)
