import moment from "moment"
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { MdEdit } from "react-icons/md";
export const Notizli=({notiz})=>{
  
    const [index, setIndex] = useState(-1);
    const slides = notiz.images ? notiz.images.map((image) => ({ src: image })) : [];
const navigate=useNavigate()

return(
<div className=" flex-grow mx-2  ">
<div className="  p-4  ps-10 border shadow-md rounded-md  flex flex-col  w-3/4  mb-4  mx-auto max-md:w-3/4" >
<div className="flex justify-between mb-4  ">
    <h1 className="text-xl font-medium mx-2 ms-0">{notiz.title}</h1>
    <span className=" text-rose-600 font-medium">{moment(notiz.datum).format("DD-MM-YYYY")}</span></div>
    <p dangerouslySetInnerHTML={{__html:notiz.text}}></p>
    <div className="flex gap-8 flex-wrap my-6 items-start  ">
    {slides.length>0&&
        slides.map((slide, index)=>(
    <img  className="w-60 h-auto cursor-pointer  max-sm:w-30 rounded-md shadow-md sm:hover:scale-110 ease-in-out  transition delay-150 duration-300  " key={index} src={slide.src} alt="image"   onClick={() => setIndex(index)}/>))}</div>
<button className="drop-shadow-lg px-4  py-1 rounded bg-teal-500  text-white sm:hover:bg-teal-900 self-end " onClick={()=>navigate(`/notiz/${notiz._id}`)}>mehr</button>
<Lightbox
        index={index}
        slides={slides}
        open={index >= 0}
        close={() => setIndex(-1)}
      />
</div></div>)
}