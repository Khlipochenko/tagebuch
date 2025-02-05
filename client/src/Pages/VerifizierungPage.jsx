import {NavLink,  useParams} from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
export const VerifizierungPage=()=>{
const {ver}=useParams()
    
 
    const [state, setState]=useState('Verifizierung ist nicht erfolgreich')
    const [isVirify, setIsVirify]=useState(false)
    const {url}=useContext(AppContext)
    console.log('ver',ver),
            console.log(url)
    useEffect(()=>{
        const verifyUser=async()=>{
            
         
            try{
                const response= await fetch(`${url}users/verify/${ver}`)
            const data=await response.json()
            if(data.success){

                setState('Erfolgreich verifiziert!')
                setIsVirify(true)
               
            }
          
            }catch(e){

               console.error(error);
                setState('Es gab ein Problem bei der Verifizierung.');
            }
        }
    verifyUser()
    },[ver]


)
    return(
        <>
        <div className='mt-24' >
        <h1 className=' text-center text-2xl font-medium  text-green-900'>Verifizierung</h1>
        {isVirify?<div className='contaiter gap-2 flex items-center mt-10 flex-col h-screen text-lg'><p className=' text-green-600 font-medium'>{state} </p>
        <p> Jetzt gehen Sie bitte zur Homeseite und da konnen sie sich einloggen!
       
        </p>
        <button className=' mt-10 drop-shadow-lg  py-1 rounded bg-teal-500  text-white sm:hover:bg-teal-900 w-24'>
        <NavLink to='/home'>Home</NavLink></button>
        </div>
        :
        <p className=' text-red-600 font-medium'> Verifizierung ist nicht erfolgreich</p>
        }
       
        </div>
        </>
        

    )
}