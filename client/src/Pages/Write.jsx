import Quill from "quill";
import { useState, useRef, useEffect, useContext } from "react";
import "quill/dist/quill.snow.css";
import { RiImageAddLine } from "react-icons/ri";
import moment from "moment";
import { TiDelete } from "react-icons/ti";
import { AppContext } from "../context/AppContext";
import { useUser , useAuth} from "@clerk/clerk-react";


export const Write = () => {
  const {user}=useUser()
  const {getToken}=useAuth()
  const {url}=useContext(AppContext)
  const [title, setTitle] = useState("");

  const [files, setFiles] = useState([]);
  const [datum, setDatum] = useState(moment().format("YYYY-MM-DD"));
  const editorRef = useRef("");
  const quillRef = useRef("");

async function handleOnSubmit(e){
    e.preventDefault()
    const token=await getToken()
    console.log(token);
    const description=quillRef.current.getContents()
    const descriptionStr=JSON.stringify(description)
    console.log(descriptionStr);
    const formData=new FormData()
   formData.append('title', title)
   formData.append('text', descriptionStr)
  formData.append('datum', datum)
  if(files!=[]){
  files.forEach((file)=>{
    formData.append('images', file)
  })}

   
 console.log('form data', formData);  


    try {
      const response = await fetch(`${url}users/write`, {
        method: "POST",
        body: formData,
        headers: {
         
          "Authorization":`Bearer ${token}`
        },
      });
      const result = await response.json()
       if (!result.ok) {
        console.log(result);
       } else {
         alert('succsess')
        
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
    <form onSubmit={(e)=>handleOnSubmit(e)} className="flex flex-col items-center justify-center w-2/4 mx-auto mt-12">
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
        <div ref={editorRef}></div>
      </div>
    
      <div className="flex flex-wrap gap-4 mt-14">
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
           
            id="file"
            name="file"
          />
        </label>

        <button  className=" drop-shadow-lg  py-1 rounded bg-teal-500  text-white sm:hover:bg-teal-900 w-24">
          Speichern
        </button>
      </div>
    </form>

   
</>
  );
};
