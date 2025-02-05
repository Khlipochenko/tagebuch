import { IoIosArrowBack } from "react-icons/io";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
export const Request=({setLoginModus, setState, email, setEmail, setFormError, setAlertText, setFormSuccess, })=>{
    const {url}=useContext(AppContext)
    const navigate=useNavigate()
async function onSubmitHandle(e){
    e.preventDefault()
    if(!email){
        setFormError(true)
            setAlertText('Email muss ausgefüllt werden!')
            setTimeout(() => {
                setFormError(false)
                setAlertText('')
            }, 2000)
            return}

            try{
                const response=await fetch(`${url}users/reset-password-email`,{
                    method: "POST",
                    credentials:'include',
                    body: JSON.stringify({email}),
                    headers: {
                         "Content-Type": "application/json",
                    },
                })
                const result=await response.json()
              console.log(result)
                if(!result.success){
                        setFormError(true)
                        setAlertText(result.message)
                     
                        setEmail('')
        
                        setTimeout(() => {
                         
                            setFormError(false)
                        }, 2000)
                        return
                }
    
             
          
                setFormSuccess(true)
                setAlertText(result.message)         
                setEmail('')
                setTimeout(() => {
                    setFormSuccess(false)
                    setLoginModus(false)
                    navigate('/send-email')
                }, 3000)
            }catch(e){
                console.log(e)
            }


    
}
return(
    <form onSubmit={(e) => onSubmitHandle(e)} className="flex flex-col gap-2" >
    <button onClick={()=>setState('Login') } className="absolute top-3 left-4 cursor-pointer  text-teal-700 sm:hover:bg-teal-700 sm:hover:text-white font-medium border border-teal-700 p-1 rounded-full"><IoIosArrowBack /></button>
    <h1 className="text-xl font-medium text-center my-1">Passwort vergessen?</h1>
    <p className="py-1">Keine Sorge! Das kann passieren. Bitte geben Sie die E-Mail-Adresse ein, die mit Ihrem Konto verknüpft ist.</p>
                                        <span onClick={() => setLoginModus(false)} className="absolute top-1 right-4 cursor-pointer  text-teal-700 sm:hover:text-red-800 font-medium">x</span>
                                        <label htmlFor="email"> Email</label>
                                        <input className=" border p-2 rounded outline-none "  name="email" type="email" placeholder="exaple@gmail.com" onChange={e=>setEmail(e.target.value)} value={email} />
                                       
                                         
                                        
                                        <button type="onsubmit" className="drop-shadow-lg px-4 mt-2  py-1 rounded bg-teal-500  text-white sm:hover:bg-teal-900">senden</button>
                                        
                                    </form> 
)
}