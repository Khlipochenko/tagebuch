import { useContext, useEffect } from 'react'
import logo from '../assets/logo.png'
import { SignedIn, SignedOut, SignInButton, useAuth, useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { AppContext } from '../context/AppContext'

export const Header=()=>{
const{isLogin, setIsLogin,
  userName, setUserName}=useContext(AppContext)
  const {user}=useUser()
  const {openSignIn}=useClerk()

 // console.log(user.user.fullName);

 useEffect(()=>{
  if (user){
    setIsLogin(true)

  }
  else{
    setIsLogin(false)
  }
 },[user])

   return(
    <div className='flex w-full px-3 justify-between shadow-md  py-3 bg-teal-800'>
    <div className=" rounded-full aspect-square w-10 bg-[url('./assets/logo.png')] bg-cover  bg-center "></div>
         

<div className='self-center'>

{user?
(<div className='flex gap-4 '>
<p className='max-sm:hidden  text-slate-100 '> Hallo, {user.fullName} </p>
        <UserButton />
    </div>):(
      <button className='drop-shadow-lg px-4  py-1 rounded bg-teal-500  text-white sm:hover:bg-teal-900' onClick={()=>openSignIn()}>Login</button>
    )
    }  
    </div>
    </div>
   )
}