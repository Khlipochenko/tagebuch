import { useContext, useEffect, useState } from 'react'
import logo from '../assets/logo.png'
//import { SignedIn, SignedOut, SignInButton, useAuth, useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { AppContext } from '../context/AppContext'
import { LoginUser } from './LoginUser'

export const Header=()=>{
const{isLogin, setIsLogin,
  userData, setUserData,loginModus, setLoginModus}=useContext(AppContext)
  
  //const {user}=useUser()
 // const {openSignIn}=useClerk()

 // console.log(user.user.fullName);

  // useEffect(()=>{
  //  if (userData){
  //    setIsLogin(true)

  //  }
  //  else{
  //    setIsLogin(false)
  //  }
  //   },[userData])

   return(
    <div className='flex w-full px-3 justify-between shadow-md  py-3 bg-teal-800'>
    <div className=" rounded-full aspect-square w-10 bg-[url('./assets/logo.png')] bg-cover  bg-center "></div>
         

<div className='self-center'>

{isLogin?
(<div className='flex gap-4 '>
<p className='max-sm:hidden  text-slate-100 first-letter:uppercase  '> Hallo, {userData.name[0].toUpperCase()+userData.name.slice(1).toLowerCase()} </p>
      {/* <UserButton /> */}
    </div>):(

      <button className='drop-shadow-lg px-4  py-1 rounded bg-teal-500  text-white sm:hover:bg-teal-900' onClick={()=>setLoginModus(true)}>Login</button>
    )
    }  
    </div>
    {loginModus&&
<LoginUser ></LoginUser>}
    </div>

   )
}