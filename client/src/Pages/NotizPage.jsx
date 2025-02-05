import { useContext, useEffect, useState } from "react"
import { NavLink, useNavigate, useParams } from "react-router-dom"
import { AppContext } from "../context/AppContext"
import moment from "moment"
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { MdEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import Alert from '@mui/material/Alert';
export const NotizPage=()=>{
    const { id } =useParams()
    const navigate=useNavigate()
    const {url, fetchNotizen}=useContext(AppContext)
const [notiz,setNotiz]=useState(null)
const [index, setIndex] = useState(-1);
const [slides, setSlides]=useState(null)
const [formSuccess, setFormSuccess] = useState(false)
const [formError, setFormError] = useState(false)
const [alertText, setAlertText] = useState('')
const [ AlertZeigen, setAlertZeigen]=useState(false)
    const fetchNotiz=async()=>{
        try{
            const response= await fetch(`${url}notizen/${id}`,{
                method: "GET",
                credentials:'include'
            })
            if(!response.ok){
                throw new Error(response.status)
            }
            const result= await response.json()
            if(result.success){
                setNotiz(result.notiz)
                console.log(result.notiz)
                const slides = result.notiz.images ? result.notiz.images.map((image) => ({ src: image })) : [];
           setSlides(slides)
           
            }
            else{
            navigate('/home')
               setNotiz(null)
            }
        }catch(e){
            console.log(e)
        }
    }

    async function deleteHandle() {
        try{
            const response= await fetch(`${url}notizen/${id}`,{
                method: "DELETE",
                credentials:'include'
            })
            if(!response.ok){
                throw new Error(response.status)
            }
            const result= await response.json()
            if(result.success){
                fetchNotizen()
               setNotiz(null)
                setAlertZeigen(true)
                setFormSuccess(true)
                setAlertText(result.message)
                setTimeout(()=>{
                    setAlertText('')
                    setFormSuccess(false)
                    setAlertZeigen(false)
                    navigate('/home')
                },2000)
           
            }
            else{
            navigate('/home')
               setNotiz(null)
               setAlertZeigen(true)
                setFormError(true)
                setAlertText(result.message)
                setTimeout(()=>{
                    setAlertText('')
                    setFormError(false)
                    setAlertZeigen(false)
                    navigate('/home')
                },3000)

            }
        }catch(e){
            console.log(e)
        }
    }
   
useEffect(()=>{
fetchNotiz()

},[])

  
    return(

   
    AlertZeigen
        ?<>
    <div className=" fixed inset-0 h-screen w-screen backdrop-blur-sm bg-black/30 flex flex-col justify-center items-center z-10">
      {formError && <Alert severity="error" className=" my-2">{alertText}</Alert>}
      {formSuccess && <Alert severity="success" className=" my-2">{alertText}</Alert>}

    </div>
        </>
          
          :
   
            <>
             {notiz?
    <div className="mt-20 flex flex-col items-center  mb-20  max-sm:mx-0"> 
    <div className="m-0 w-6/12 max-sm:w-4/5 ">
    <div className="flex items-center justify-between ">
   
   
    <div>
    { notiz.title&&  <h1 className=" text-3xl font-medium text-emerald-800 my-3">{notiz.title}</h1>} 
        <span className="text-red-700 font-medium ">{moment(notiz.datum).format('DD-MM-YYYY')}</span></div>
        
        
        <div ><button className="mr-4 text-emerald-700  sm:hover:text-emerald-900 sm:hover:scale-110"><MdEdit className=" text-xl"  onClick={()=>navigate(`/edit/${id}`)}/></button>
        <button className="  text-rose-700  sm:hover:text-red-900 sm:hover:scale-110" onClick={()=>deleteHandle()}><FaTrashAlt className="text-xl" /></button></div>   
        </div>
        <p className="my-3" dangerouslySetInnerHTML={{__html:notiz.text}}></p>
    <div className="flex gap-8 flex-wrap items-start">
    {notiz.images.length>0&&
   slides.map((slide, i)=>(
    <img className="w-80 h-auto  max-sm:w-30 rounded shadow-md cursor-pointer   sm:hover:scale-110 ease-in-out  transition delay-150 duration-300 mt-4" key={i} src={slide.src} alt="image" onClick={() => setIndex(i)}/>))}
    </div> 
    <Lightbox
        index={index}
        slides={slides}
        open={index >= 0}
        close={() => setIndex(-1)}
      />
     </div> 
     <NavLink to='/home' className='drop-shadow-lg px-4  py-1 rounded bg-rose-700  text-white sm:hover:bg-red-900 w-20 fixed bottom-20 right-7 max-sm:hidden'>Zurück</NavLink>
    
    </div>
    :
        <div className="mt-20 flex flex-col items-center mx-20 ">Eintrag nicht gefunden</div>}</>
    )
}