import { useContext, useEffect, useState } from "react"
import { AppContext } from "../context/AppContext"
import Alert from '@mui/material/Alert';
import { NavLink, useNavigate, useParams } from "react-router-dom";

import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
export const ResetPassword = () => {
    const navigate=useNavigate()
const {url}=useContext(AppContext)
    const { token } =useParams()
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [passwortZeigen1, setPasswortZeigen1] = useState(false)
    const [passwortZeigen2, setPasswortZeigen2] = useState(false)
    const [isPassordEqual, setIsPasswordEgual] = useState('')
    const [isPasswordFieldInFocus, setIsPasswordFieldInFocus]=useState(false)
const [isPasswordStrong, setIsPasswordStrong]=useState('')
const [formSuccess, setFormSuccess] = useState(false)
const [formError, setFormError] = useState(false)
const [alertText, setAlertText] = useState('')

async function onSubmitHandleReset(e) {
    e.preventDefault()
    if ( !password || !password2 ) {
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
            setAlertText('')
        }, 3000)
        return
    }
    if (password !== password2) {
        setFormError(true)
        setAlertText('Passwort soll gleich sein')
        setTimeout(() => {
            setFormError(false)
            setAlertText('')
        }, 3000)
        return

    }

 
    try {
        const response = await fetch(`${url}users/reset-password/${token}`, {
            method: "POST",
           
            body: JSON.stringify({password}),
            headers: {
                 "Content-Type": "application/json",
            },
        });
        const result = await response.json()
        if (!result.success) {
            setFormError(true)
            setAlertText(result.message)
            setPassword('')
            setPassword2('')

            setTimeout(() => {
                setFormError(false)
                setAlertText('')
                navigate('/home')
            }, 3000)

        } else {
            setFormSuccess(true)
            setAlertText(result.message)
         
            setPassword('')
            setPassword2('')
            setTimeout(() => {
                setFormSuccess(false)
                setAlertText('')

                navigate('/home')
               
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
    return (
<>
<div className="w-screen mt-48">
{alertText&&<div className="fixed inset-0 h-screen w-screen backdrop-blur-sm bg-black/30 flex flex-col justify-center items-center z-50">
                        {formError && <Alert severity="error" className=" my-2">{alertText}</Alert>}
                        {formSuccess && <Alert severity="success" className=" my-2">{alertText}</Alert>  }
                        
                        </div>
                        
}


        
        <div className=" w-80 mx-auto ">

            <form onSubmit={(e) => onSubmitHandleReset(e)} className="flex flex-col gap-2" >

                <label htmlFor="password">Passwort</label>
                <div className={`flex border p-2 rounded items-center justify-between ${isPasswordStrong === 'no' && 'border-red-500'}`}>
                    <input className="outline-none" id="password" name="password" type={passwortZeigen1 ? "text" : 'password'} placeholder=" dein passwort"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setIsPasswordFieldInFocus(true)}
                        onBlur={() => setIsPasswordFieldInFocus(false)}
                        required
                    /> <button type="button" className=" sm:hover:text-red-800 font-medium" onClick={() => setPasswortZeigen1(prev => !prev)}>{passwortZeigen1 ? <FaRegEye /> : <FaRegEyeSlash />}</button>

                </div>
                {isPasswordFieldInFocus && <p className="m-0 text-xs text-teal-700">Das Passwort muss mindestens 8 Zeichen lang sein und mindestens 1 Sonderzeichen, 1 Großbuchstaben und 1 Zahl enthalten</p>}
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
                    /> <button type="button" className=" sm:hover:text-red-800 font-medium" onClick={() => setPasswortZeigen2(prev => !prev)}>{passwortZeigen2 ? <FaRegEye /> : <FaRegEyeSlash />}</button></div>
                <button type="submit" className="drop-shadow-lg px-4 mt-2  py-1 rounded bg-teal-500  text-white sm:hover:bg-teal-900">Passwort zurücksetzen</button>

            </form>



            <button className=' mt-10 drop-shadow-lg  py-1 rounded bg-teal-500  text-white sm:hover:bg-teal-900 w-24'>
                <NavLink to='/home'>Home</NavLink></button>

        </div></div></>
    )

} 