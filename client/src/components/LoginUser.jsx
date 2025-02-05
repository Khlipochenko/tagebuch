import { useContext, useEffect, useState } from "react"
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { AppContext } from "../context/AppContext";
import { GoogleLogin } from '@react-oauth/google';
import Alert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";
import { Request } from "./Request";


export const LoginUser = () => {
const navigate=useNavigate()

    const { loginModus, setLoginModus, url, userData, setUserData,isLogin, setIsLogin  } = useContext(AppContext)
    const [state, setState] = useState('Login')
   const [LoginErforglech, setLoginErfotglech]=useState(false)// wenn erfolg dann nicht fenster mit Form zeigen
    const [passwortZeigen, setPasswortZeigen] = useState(false)
    const [passwortZeigen1, setPasswortZeigen1] = useState(false)
    const [passwortZeigen2, setPasswortZeigen2] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [isPassordEqual, setIsPasswordEgual] = useState('')
    const [formSuccess, setFormSuccess] = useState(false)
    const [formError, setFormError] = useState(false)
    const [alertText, setAlertText] = useState('')
const [isPasswordFieldInFocus, setIsPasswordFieldInFocus]=useState(false)
const [isPasswordStrong, setIsPasswordStrong]=useState('')
//Google
async function handleGoogleLoginSuccess(credentialResponse){
    console.log('Google Login Response:', credentialResponse);
try{
    const response = await fetch (`${url}users/google-auth`,{
        method: "POST",
        headers:{
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({
            credential: credentialResponse.credential, 
          
          }),
          credentials: 'include', 
        });
  const result= await response.json()
  if(!result.success){
    setFormError(true)
    setAlertText(result.message)
    setName('')
    setEmail('')
    setPassword('')
    setPassword2('')

    setTimeout(() => {
     
        setFormError(false)
    }, 3000)
    return
}

setUserData (result.userData)
setIsLogin(true)
setFormSuccess(true)
setAlertText(result.message)
setName('')
setEmail('')
setPassword('')
setPassword2('')
setLoginErfotglech(true)
setTimeout(() => {
setFormSuccess(false)

setLoginModus(false)
navigate('/home')
}, 2000)
}catch(e){
console.log(e)
}
}








//Login function
    async function onSubmitHandle(e) {
        e.preventDefault()
        if(!email || !password){
            setFormError(true)
            setAlertText('Alle Felder müssen ausgefüllt werden!')
            setTimeout(() => {
                setFormError(false)
                setAlertText('')
            }, 3000)
            return
        }
        const userData={email,password}


        try{
            const response=await fetch(`${url}users/login`,{
                method: "POST",
                credentials:'include',
                body: JSON.stringify(userData),
                headers: {
                     "Content-Type": "application/json",
                },
            })
            const result=await response.json()
          console.log(result)
            if(!result.success){
                    setFormError(true)
                    setAlertText(result.message)
                    setName('')
                    setEmail('')
                    setPassword('')
                    setPassword2('')
    
                    setTimeout(() => {
                     
                        setFormError(false)
                    }, 3000)
                    return
            }

            setUserData (result.userData)
            setIsLogin(true)
            setFormSuccess(true)
            setAlertText(result.message)
            setName('')
            setEmail('')
            setPassword('')
            setPassword2('')
            setLoginErfotglech(true)
            setTimeout(() => {
                setFormSuccess(false)
           
                setLoginModus(false)
                navigate('/home')
            }, 2000)
        }catch(e){
            console.log(e)
        }
    }


 //Register funktion   
 
 



   async function onSubmitHandleSignUp(e) {
        e.preventDefault()
        if (!email || !password || !password2 || !name) {
            setFormError(true)
            setAlertText('Alle Felder müssen ausgefüllt werden!')
            setTimeout(() => {
                setFormError(false)
                setAlertText('')
            }, 3000)
            return

        }
      
        const isValid= isValidPassword(password)
        if(!isValid.valid){
            setFormError(true)
            setAlertText(isValid.message)
            setTimeout(() => {
                setFormError(false)
            }, 3000)
            return
        }
        if (password !== password2) {
            setFormError(true)
            setAlertText('Passwort soll gleich sein')
            setTimeout(() => {
                setFormError(false)
            }, 3000)
            return

        }

        const usereData = {
            name, email, password
        }
        try {
            const response = await fetch(`${url}users/register`, {
                method: "POST",
               
                body: JSON.stringify(usereData),
                headers: {
                     "Content-Type": "application/json",
                },
            });
            const result = await response.json()
            if (!result.success) {
                setFormError(true)
                setAlertText(result.message)
                setName('')
                setEmail('')
                setPassword('')
                setPassword2('')

                setTimeout(() => {
                    setFormError(false)
                }, 3000)

            } else {
                setFormSuccess(true)
                setAlertText(result.message)
                setName('')
                setEmail('')
                setPassword('')
                setPassword2('')
                setTimeout(() => {
                    setFormSuccess(false)

                    navigate('/email')
                    setLoginModus(false)
                }, 3000)
            }
        } catch (e) {
            console.log(e)
        }}
        function isValidPassword(password) {
            if (password.length < 8) {
                return { valid: false, message: "Das Passwort muss mindestens 8 Zeichen lang sein." };
            }
        
            const hasNumber = /[0-9]/.test(password);
            const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
            const hasUpperCase = /[A-Z]/.test(password);
        
            if (!hasNumber) {
                return { valid: false, message: "Das Passwort muss mindestens eine Zahl enthalten." };
            }
        
            if (!hasSpecialChar) {
                return { valid: false, message: "Das Passwort muss mindestens ein Sonderzeichen enthalten." };
            }
        
            if (!hasUpperCase) {
                return { valid: false, message: "Das Passwort muss mindestens einen Großbuchstaben enthalten." };
            }
        
            return{valid: true};
        }


        useEffect(() => {
            
            if(password===''){
                setIsPasswordStrong('')
            }
           
            else if(isValidPassword(password).valid){
                setIsPasswordStrong('yes')
            }
            else{
                setIsPasswordStrong('no')
              
            }
           
            if (password === password2 && password != '' && password2 != '') {
                setIsPasswordEgual('yes')
            }
            else if (password2 !== '' && password !== '') {
                setIsPasswordEgual('no')
            }
            else {
                setIsPasswordEgual('')
            }
            
        }, [password2, password])





        
    
        



        return (<>


            <div >
          
                {
 
//LOGIN                   
                   loginModus &&
                    <div className="fixed inset-0 h-screen w-screen backdrop-blur-sm bg-black/30 flex flex-col justify-center items-center z-50">
                        {formError && <Alert severity="error" className=" my-2">{alertText}</Alert>}
                        {formSuccess && <Alert severity="success" className=" my-2">{alertText}</Alert>}
                       {!LoginErforglech&& <div className="bg-white rounded-xl  p-10   w-96 relative">
                            <h1 className=" text-center text-teal-700 font-medium pb-2 uppercase">{state}</h1>
                            {state === 'Login' &&
                                <form onSubmit={(e) => onSubmitHandle(e)} className="flex flex-col gap-2" >
                                    <span onClick={() => setLoginModus(false)} className="absolute top-1 right-4 cursor-pointer  text-teal-700 sm:hover:text-red-800 font-medium">x</span>
                                    <label htmlFor="email"> Email</label>
                                    <input className=" border p-2 rounded outline-none "  name="email" type="email" placeholder="exaple@gmail.com" onChange={e=>setEmail(e.target.value)} value={email} />
                                    <label htmlFor="password">Passwort</label>
                                    <div className="flex border p-2 rounded items-center justify-between">
                                    <input className="outline-none"  name="password" type={passwortZeigen1 ? "text" : 'password'}
                                     placeholder=" dein passwort"
                                     onChange={(e)=>setPassword(e.target.value)}
                                     value={password}
                                      />
                                       <button type="button" className=" sm:hover:text-red-800 font-medium" onClick={() => setPasswortZeigen1(prev => !prev)}>{passwortZeigen1 ? <FaRegEye />: <FaRegEyeSlash />}</button></div>

                                    <button type="onsubmit" className="drop-shadow-lg px-4 mt-2  py-1 rounded bg-teal-500  text-white sm:hover:bg-teal-900">{state}</button>
                                    <button className="text-end text-sm text-blue-500 cursor-pointer" onClick={() => {
                                            setState('Senden Email')
                                         setEmail('')
                                        setPassword('')
                                        setPassword2('')
                                        setName('')}}>Passwort vergessen?</button>
                                </form> }

{//REGESTRIRUNGFORM
state === 'Sign Up' &&

                                <form onSubmit={(e) => onSubmitHandleSignUp(e)} className="flex flex-col gap-2" >
                                    <span onClick={() => setLoginModus(false)} className="absolute top-1 right-4 cursor-pointer  text-teal-700 sm:hover:text-red-800 font-medium">x</span>
                                    <label htmlFor="name"> Vor- und Nachname</label>
                                    <input className=" border p-2 rounded outline-none " id="name" name="name" type="name" placeholder="Vor- und Nachname"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <label htmlFor="email"> Email</label>
                                    <input className=" border p-2 rounded outline-none " name="email" type="email" placeholder="exaple@gmail.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <label htmlFor="password">Passwort</label>
                                    <div className={`flex border p-2 rounded items-center justify-between ${ isPasswordStrong=== 'no' && 'border-red-500'}`}>
                                        <input className="outline-none" id="password" name="password" type={passwortZeigen ? "text" : 'password'} placeholder=" dein passwort"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            onFocus={()=>setIsPasswordFieldInFocus(true)}
                                            onBlur={()=>setIsPasswordFieldInFocus(false)}
                                            required
                                        /> <button type="button" className=" sm:hover:text-red-800 font-medium" onClick={() => setPasswortZeigen(prev => !prev)}>{passwortZeigen ? <FaRegEye />: <FaRegEyeSlash />}</button>
                                            
                                        </div>
                                       {isPasswordFieldInFocus&& <p className="m-0 text-xs text-teal-700">Das Passwort muss mindestens 8 Zeichen lang sein und mindestens 1 Sonderzeichen, 1 Großbuchstaben und 1 Zahl enthalten</p>}
                                    <label htmlFor="password">Passwort bestätigen</label>
                                    <div className={`flex border p-2 rounded items-center justify-between ${isPassordEqual === 'no' && 'border-red-500'}`} >
                                        <input className="outline-none" id="password2" name="password2"
                                            type={passwortZeigen2 ? "text" : 'password'}
                                            placeholder="passwort bestätigen"
                                            value={password2}
                                            onChange={(e) => {
                                                setPassword2(e.target.value)
                                                if (e.target.value === password && password2 != '') {
                                                    setIsPasswordEgual('yes')
                                                }
                                                else {
                                                    setIsPasswordEgual('no')
                                                }

                                            }}
                                            onBlur={() => {
                                                if (!password) {
                                                    setIsPasswordEgual('')
                                                }
                                                if (password === password2) {
                                                    setIsPasswordEgual('yes')

                                                }
                                                else (
                                                    setIsPasswordEgual('no')
                                                )
                                            }}
                                            required
                                        /> <button type="button" className=" sm:hover:text-red-800 font-medium" onClick={() => setPasswortZeigen2(prev => !prev)}>{passwortZeigen2 ?<FaRegEye />: <FaRegEyeSlash />  }</button></div>
                                    <button type="submit" className="drop-shadow-lg px-4 mt-2  py-1 rounded bg-teal-500  text-white sm:hover:bg-teal-900">{state}</button>

                                </form>
                            }
                            {state!=='Senden Email'&&
                            
                            <div className="flex flex-col items-center justify-center gap-2">
                                <div className=" flex items-center justify-center ">
                                    <span className="border-b-2 w-28 inline-block">   </span>
                                    <span className=" mx-1 py-2">oder</span>
                                    <span className="border-b-2 w-28 inline-block"></span>
                                </div>
                              
     <GoogleLogin className='mx-auto '
       onSuccess={credentialResponse => {
        handleGoogleLoginSuccess(credentialResponse)
      
       }}
       onError={() => {
         console.log('Login Failed');
       }} />
  


                            </div>  }
                            <div className="flex justify-end gap-2 mt-2 text-sm">

                                {state === 'Login' &&
                                    <> <p className="text-neutral-700">Noch kein Konto haben?</p>
                                        <button type="button" className="text-blue-500 cursor-pointer" onClick={() => {
                                        setState('Sign Up')
                                        setEmail('')
                                        setPassword('')
                                        setPassword2('')
                                        setName('')
                                        }}>Sign Up</button>
                                    </> }
                                    {state==='Sign Up'&&
                                    <> <p className="text-neutral-700">Hast du schon ein Konto?</p>
                                        <button type="button" className="text-blue-500 cursor-pointer" onClick={() => {
                                            setState('Login')
                                         setEmail('')
                                        setPassword('')
                                        setPassword2('')
                                        setName('')
                                        
                                        }}>Login</button>
                                    </>}
                                

                            </div>
                        
                    
{//Reset
state==='Senden Email'&&
    <Request setState={setState} setEmail={setEmail} email={email} setLoginModus={setLoginModus} setFormError={setFormError} setAlertText={setAlertText} setFormSuccess={setFormSuccess}></Request>

}
</div>}
</div>}

            </div>
        </>)
    }