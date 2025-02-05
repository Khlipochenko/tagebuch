import Quill from "quill";
import { useState, useRef, useEffect, useContext } from "react";
import "quill/dist/quill.snow.css";
import { RiImageAddLine } from "react-icons/ri";
import moment from "moment";
import { TiDelete } from "react-icons/ti";
import { AppContext } from "../context/AppContext";
import { NavLink, useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
export const Write = () => {
const navigate=useNavigate()
  const {url, userData,fetchNotizen}=useContext(AppContext)
  const [title, setTitle] = useState("");
  const [formSuccess, setFormSuccess] = useState(false)
  const [formError, setFormError] = useState(false)
  const [alertText, setAlertText] = useState('')
  const [ AlertZeigen, setAlertZeigen]=useState(false)
  const [files, setFiles] = useState([]);
  const [datum, setDatum] = useState(moment().format('YYYY-MM-DD'));
const [isLoading, setIsloading]=useState(false)
  const editorRef = useRef("");
  const quillRef = useRef("");
  

async function handleOnSubmit(e){
    e.preventDefault()
   
    const descriptionStr=quillRef.current.root.innerHTML
    const descriptionText=quillRef.current.getText();
    console.log('length',descriptionText )
if(descriptionText.length<2){
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
 
   formData.append('title', title)
   formData.append('text', String(descriptionStr))
  formData.append('datum', datum)
  formData.append('onlyText',descriptionText)
  if(files.length>0){
  files.forEach((img)=>{
    formData.append('images', img)
  })}

   
  for (let [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
  }


    try {
      setAlertZeigen(true)
      setIsloading(true)
      const response = await fetch(`${url}notizen/write`, {
        method: "POST",
        credentials:'include',
        body: formData,
        
      });
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
          
          setAlertZeigen(false)
          setFormSuccess(false)
          setAlertText('')
          fetchNotizen()
          navigate('/')
        }, 2000)
         
        
      console.log(result);
      
    }} catch (error) {
      console.error(error);
    }
  
  }

function handleOnChangeAddFotos(e) {
    const newFoto=e.target.files[0]
    console.log('newFoto',newFoto);
    setFiles(prev=>[ ...prev, newFoto])
    
}
function handleOnClickDeleteImage(index) {
  console.log('i',index);
  console.log('files',files);
  const newFiles=files.filter((image, i)=>i!==index)
  setFiles(newFiles)
}



  useEffect(() => {
    //Initiate Qill only once
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });
    }
  }, []);
  return (
    <>
   {AlertZeigen&&(
<div className=" fixed inset-0 h-screen w-screen backdrop-blur-sm bg-black/30 flex flex-col justify-center items-center z-10">
  {formError && <Alert severity="error" className=" my-2">{alertText}</Alert>}
  {formSuccess && <Alert severity="success" className=" my-2">{alertText}</Alert>}
  {isLoading&&  <CircularProgress color="inherit" />}
</div>)}
   
      

    <div className=" min-h-screen my-20 ">
    <form onSubmit={(e)=>handleOnSubmit(e)} className="flex flex-col items-center justify-center w-2/4 mx-auto mt-12 max-sm:w-3/4 max-sm:mb-24">
      <label className="self-start" for="date">
        Datum:
        <input
          className=" text-center text-red-700 "
          type="date"
          value={datum}
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
      {files.length>0&&
      files.map((image, index)=>(
        <div className="w-60 relative" key={index}>
      <img className="w-full shadow-md rounded-md" src={ URL.createObjectURL(image)} alt={`image ${index}`}/>
         <TiDelete onClick={()=>handleOnClickDeleteImage(index)} className="absolute top-1 right-1  size-7  text-teal-700 sm:hover:text-red-800 cursor-pointer" />
      
      </div>))}</div>
      <div className="flex  mt-14 items-center  justify-between w-full ">
        <label className="  cursor-pointer" for="file">
          <RiImageAddLine className="mt-1 size-9 text-teal-900 sm:hover:text-red-800" />
          <input onChange={e=>handleOnChangeAddFotos(e)}
            className="hidden"
            type="file"
           accept="image/*"
            id="file"
            name="images"
          />
        </label>

        <button  className=" drop-shadow-lg  py-1 rounded bg-teal-500  text-white sm:hover:bg-teal-900 w-24">
          Speichern
        </button>
      </div>
    </form>

    <NavLink to='/home'  className='drop-shadow-lg px-4  py-1 rounded bg-rose-700  text-white sm:hover:bg-red-900 w-20 fixed bottom-20 right-7 '>Zurück</NavLink>
</div></>
  );
};
