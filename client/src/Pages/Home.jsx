import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { Notizli } from '../components/Notizli'
import { FaSearch } from "react-icons/fa";

export const Home=()=>{
 const navigate=useNavigate()
    const {isLogin, setIsLogin,userData, loginModus, setLoginModus, notizen, setNotizen}=useContext(AppContext)
const [searchValue, setSearchValue]=useState('')
const [filterData,setFilterDate]=useState([])

function handleOnSubmitSearch(e){
  e.preventDefault()
console.log(notizen);

  window.scrollTo(0,0)
  const newFilterData= notizen.filter((data)=> 
    data.title?.toLowerCase().includes(searchValue.toLowerCase())
||data.datum.toLowerCase().includes(searchValue.toLowerCase() )
||data.onlyText?.toLowerCase().includes(searchValue.toLowerCase()))
if(e.target.value==''){
  setFilterDate(notizen)
}

setFilterDate(newFilterData)


}
useEffect(() => {
  setFilterDate(notizen);
}, [notizen]); 

    return(
        
        isLogin?(
      <div className=' relative mb-20 flex  items-start mt-20 gap-4 max-lg:flex-col '>
     

<div className='top-20 sticky left-5 z-10 max-sm:left-7 max-sm:top-16'>
{notizen.length>0&&
<form onSubmit={(e)=>handleOnSubmitSearch(e)} className='flex shadow-md items-center justify-center h-10 border rounded-md w-80 mb-4 bg-white '>
<FaSearch className='mx-3 text-teal-700' />
<span className='  border-s-2 h-full '></span>
<input className=' mx-2 w-3/4 outline-none' type='text' placeholder='suchen' value={searchValue} onChange={(e)=>setSearchValue(e.target.value)}/>
<button className='drop-shadow-lg px-4 h-full  rounded-md bg-teal-500  text-white sm:hover:bg-teal-900'>suchen</button>
</form>}

      <button className='   w-40  drop-shadow-lg px-4  py-1 rounded-md bg-rose-700  text-white sm:hover:bg-red-900 max-sm:hidden' onClick={()=>navigate('/write')}>Schreib jetzt +</button>

</div>

      <button className=' right-8 bottom-20 fixed flex items-center justify-center drop-shadow-lg w-14 aspect-square rounded-full bg-rose-700  text-white sm:hover:bg-red-900 text-3xl' onClick={()=>navigate('/write')}>+</button>

{notizen.length>0?<div className='flex w-5/6'>
  {filterData.length>0?
<ul className='flex-grow mt-2'>
  
    {filterData.sort((a,b)=>new Date(b.datum)-new Date(a.datum)).map((notiz,i)=>(
   <Notizli key={i} notiz={notiz}></Notizli>
  ))}
</ul>:
<div className=' mx-auto mt-20  text-3xl  max-sm:text-base'><p > Entrag mit <b>"{searchValue}"</b> nicht gefunden</p></div>}
</div>
:
<div className='mx-auto'>
  <h1 className='text-2xl  mt-10 font-medium'>Du hast noch keine Entrage</h1>
</div>
}
      </div>):(
        <div className=" flex-grow bg-[url('./assets/bild.jpeg')] bg-cover max-sm:bg-center">
        <div className='flex justify-center flex-col items-center  '>
           <h1 className=' text-3xl mx-auto w-3/5  mt-96 text-center px-10 tracking-wide leading-loose font-medium text-emerald-950 h-auto  max-sm:text-lg'>Bitte einloggen oder registrieren, um Zugang zu erhalten und dein Tagebuch zu starten.</h1>
           <button className='drop-shadow-lg px-4  py-1 rounded bg-teal-500  text-white sm:hover:bg-teal-900' onClick={()=>setLoginModus(true)}>Login</button>
           </div>  
        </div>
      )
    )
} 