import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import { AppContextProvider } from './context/AppContext.jsx'
import {GoogleOAuthProvider} from '@react-oauth/google'


const CLIENT_ID=import.meta.env.VITE_CLIENT_ID
//const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
console.log(CLIENT_ID);
if (!CLIENT_ID) {
  throw new Error("client id fehlt")
}
createRoot(document.getElementById('root')).render(
  // <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
  <GoogleOAuthProvider clientId={CLIENT_ID}>
  <AppContextProvider>
  <StrictMode>
    <App />
  </StrictMode>
  </AppContextProvider>
  </GoogleOAuthProvider>
 // </ClerkProvider>,
)
