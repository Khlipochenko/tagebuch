import { useContext } from 'react'


import { AppContext } from '../context/AppContext'
import { LoginUser } from './LoginUser'
import { Logout } from './Logout'
import { NavLink } from 'react-router-dom'
export const Header=()=>{
const{isLogin,
  userData, loginModus, setLoginModus}=useContext(AppContext)
  


   return(
    <div className='flex w-full px-3 justify-between shadow-md  py-3 bg-teal-800 fixed z-50'>
    <div className=" rounded-full aspect-square w-10 bg-[url('./assets/logo.png')] bg-cover  bg-center "></div>
         

<div className='self-center'>

{isLogin?
(<div className='flex gap-4 items-center '>
<p className='max-sm:hidden  text-slate-100 first-letter:uppercase  '> Hallo, {userData.name[0].toUpperCase()+userData.name.slice(1)} </p>
<Logout></Logout>
 <NavLink to='/home'  className='drop-shadow-lg px-4  py-1 rounded bg-rose-700  text-white sm:hover:bg-red-900 w-20 min-sm:hidden'>Zurück</NavLink>

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