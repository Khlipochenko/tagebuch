import { useContext, useEffect, useState } from 'react'
import bild from '../assets/bild.jpeg'
import { AppContext } from '../context/AppContext'
//import { useClerk, useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
export const Home=()=>{
 const navigate=useNavigate()
    const {isLogin, setIsLogin,userData, loginModus, setLoginModus}=useContext(AppContext)
   // const {user}=useUser()
   // const {openSignIn}=useClerk()
    // useEffect(()=>{
    //     if (user){
    //       setIsLogin(true)
      
    //     }
    //     else{
    //       setIsLogin(false)
    //     }
    //    },[user])
      // useEffect(()=>{
      //    if (userData.length>0){
      //      setIsLogin(true)
      
      //    }
      //    else{
      //     setIsLogin(false)
      //    }
      //   },[userData])
    return(
        
        isLogin?(
      <div>
      <button onClick={()=>navigate('/write')}>Schreib jetzt +</button>

      </div>):(
        <div className=" flex-grow bg-[url('./assets/bild.jpeg')] bg-cover max-sm:bg-center">
        <div className='flex justify-center flex-col items-center  '>
           <h1 className=' text-3xl mx-auto w-3/5  mt-96 text-center px-10 tracking-wide leading-loose font-medium text-emerald-950 h-auto max-sm:mt-12 max-sm:text-lg'>Bitte einloggen oder registrieren, um Zugang zu erhalten und dein Tagebuch zu starten.</h1>
           <button className='drop-shadow-lg px-4  py-1 rounded bg-teal-500  text-white sm:hover:bg-teal-900' onClick={()=>setLoginModus(true)}>Login</button>
           </div>  
        </div>
      )
    )
} 