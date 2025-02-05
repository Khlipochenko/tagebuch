import Quill from "quill";
import { useState, useRef, useEffect, useContext } from "react";
import "quill/dist/quill.snow.css";
import { RiImageAddLine } from "react-icons/ri";
import moment from "moment";
import { TiDelete } from "react-icons/ti";
import { AppContext } from "../context/AppContext";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
export const EditPage = () => {
    const {id}=useParams()
  
const navigate=useNavigate()
  const {url, userData,fetchNotizen}=useContext(AppContext)
  const [notiz,setNotiz]=useState('')
const [title, setTitle]=useState('')
const [datum, setDatum]=useState('')

const [images,setImages]=useState([])
const [imagesUrl, setImagesUrl]=useState([])
  const [formSuccess, setFormSuccess] = useState(false)
  const [formError, setFormError] = useState(false)
  const [alertText, setAlertText] = useState({})
  const [ AlertZeigen, setAlertZeigen]=useState(false)

  const editorRef = useRef(null);
const quillRef = useRef(null);
const [isLoading, setIsloading]=useState(false)
 
 
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
            setTitle(result.notiz.title)
           setDatum(moment(result.notiz.datum).format("YYYY-MM-DD"))
           console.log('result.notiz.datum',result.notiz.datum )
           setImagesUrl(result.notiz.images)
           console.log('url',result.notiz.images)
          
            console.log(result.notiz)
            
          
        }
        else{
        navigate('/home')
           setNotiz(null)
        }
    }catch(e){
        console.log(e)
    }
}








9

 async function handleOnSubmit(e){
         e.preventDefault()
   
    const descriptionStr=quillRef.current.root.innerHTML
     const descriptionText=quillRef.current.getText();
   
 if(descriptionText.length<2){// Prufen ob text gibt
   setAlertZeigen(true)
   setFormError(true)
  setAlertText('Bitte schreib etwas!')
   setTimeout(()=>{
     setFormError(false),
     setAlertText('')
     setAlertZeigen(false)
  
   }, 2000)
    return
 }
  const formData=new FormData()
 
    formData.append('title',title)
    formData.append('text', String(descriptionStr))
    console.log(datum)
       formData.append('datum', datum)
   formData.append('onlyText',descriptionText)
      if(images.length>0){
        images.forEach((img)=>{
     formData.append('images', img)
   })}
   
   if(imagesUrl.length>0){
    imagesUrl.forEach((img)=>{
 formData.append('imagesUrl', img)
})}
for (let [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
  }



     try {
       setAlertZeigen(true)
      setIsloading(true)
       const response = await fetch(`${url}notizen/edit/${id}`, {
         method: "PUT",
         credentials:'include',
         body: formData,
        
      });
      if(!response.ok){
            setIsloading(false)
             setFormError(true)
             setAlertText(response)
             setTimeout(()=>{
              setFormError(false),
              setAlertText('')
              setAlertZeigen(false)
             
             }, 2000)
      }
       const result = await response.json()
        if (!result.success) {
       setIsloading(false)
        setFormError(true)
        setAlertText(result.message)
        setTimeout(()=>{
         setFormError(false),
         setAlertText('')
         setAlertZeigen(false)
         navigate('/')
        }, 2000)
        } else {
         setIsloading(false)
         setFormSuccess(true)
         setAlertText(result.message)
   
         setTimeout(()=>{
           quillRef.current.root.innerHTML=''
           setTitle('')
           setDatum(moment().format())
          setImagesUrl([])
          setImages([])
          setNotiz('')
           setAlertZeigen(false)
           setFormSuccess(false)
           setAlertText('')
           fetchNotizen()
           navigate(`/notiz/${id}`)
         }, 2000)
         

      
     }} catch (error) {
       console.error(error);
     }
  
   }

 function handleOnChangeAddFotos(e) {
    if (!e.target.files.length) return; 
    const newFoto=e.target.files[0]
    console.log('newFoto',newFoto);
    setImages(prev=>[ ...prev, newFoto])
    
 }  
 
 function handleOnClickDeleteImage(index) {
const newImages=images.filter((image, i)=>i!==index)
setImages(newImages)
 }
 function handleOnClickDeleteImageUrl(index) {
    const newImagesUrl=imagesUrl.filter((image, i)=>i!==index)
    setImagesUrl(newImagesUrl)
     }

useEffect(() => {
    fetchNotiz();
  }, [id]);


  useEffect(() => {

    //Initiate Qill only once
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });
    }
    if(notiz.text){
        quillRef.current.root.innerHTML = notiz.text;
    }
  }, [notiz]);
  return (
    <>
   {AlertZeigen&&(
<div className=" fixed inset-0 h-screen w-screen backdrop-blur-sm bg-black/30 flex flex-col justify-center items-center z-10">
  {formError && <Alert severity="error" className=" my-2">{alertText}</Alert>}
  {formSuccess && <Alert severity="success" className=" my-2">{alertText}</Alert>}
  {isLoading&&  <CircularProgress color="inherit" />}
</div>)}
   
      
{notiz&&
    <div className=" min-h-screen my-20 ">
    <form onSubmit={(e)=>handleOnSubmit(e)} className="flex flex-col items-center justify-center w-2/4 mx-auto mt-12 max-sm:w-4/5">
      <label className="self-start" for="date">
        Datum:
        <input
          className=" text-center text-red-700 "
          type="date"
          value={moment(datum).format('YYYY-MM-DD')}
          name="date"
          id="date"
          onChange={(e) => setDatum(e.target.value)}
        />
      </label>

      <input
        className="self-start my-4 border-b-2 outline-none w-full"
        type="text"
        id="title"
        name="title"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className=" w-full h-60">
        <div  ref={editorRef}></div>
      </div>
    
      <div className="flex flex-wrap gap-4 mt-24 max-sm:mt-24">
  {imagesUrl && imagesUrl.length > 0 &&
    imagesUrl.map((image, index) => (
      <div className="w-60 relative" key={`url-${index}`}>
        <img className="w-full shadow-md rounded-md" src={image} alt={`image ${index}`} />
        <TiDelete onClick={() => handleOnClickDeleteImageUrl(index)}
          className="absolute top-1 right-1 size-7 text-teal-700 sm:hover:text-red-800 cursor-pointer" />
      </div>
    ))
  }

  {images && images.length > 0 &&
    images.map((image, index) => (
      <div className="w-60 relative" key={`file-${index}`}>
        <img className="w-full shadow-md rounded-md" src={URL.createObjectURL(image)} alt={`image ${index}`} />
        <TiDelete onClick={() => handleOnClickDeleteImage(index)}
          className="absolute top-1 right-1 size-7 text-teal-700 sm:hover:text-red-800 cursor-pointer" />
      </div>
    ))
  }
</div>

      <div className="flex  mt-14 items-center  justify-between w-full ">
        <label className="  cursor-pointer" for="file">
          <RiImageAddLine className="mt-1 size-9 text-teal-900 sm:hover:text-red-800" />
          <input onChange={e=>handleOnChangeAddFotos(e)}
            className="hidden"
            type="file"
           accept="image/*"
            id="file"
            name="images"
          //  multiple
          />
        </label> 

        <button  className=" drop-shadow-lg  py-1 rounded bg-teal-500  text-white sm:hover:bg-teal-900 w-24">
          Speichern
        </button>
      </div>
    </form>

    <NavLink to='/home'  className='drop-shadow-lg px-4  py-1 rounded bg-rose-700  text-white sm:hover:bg-red-900 w-20 fixed bottom-20 right-7 max-sm:top-3 max-sm:right-3'>Zurück</NavLink>
</div>}</>
  );
};
