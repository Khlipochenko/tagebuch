import { createContext, useEffect, useState } from "react";

export const AppContext=createContext()
export const AppContextProvider=({children})=>{
    const [isLogin, setIsLogin]=useState(false)
    const [userData, setUserData]=useState([])
    const [loginModus, setLoginModus]=useState(false)
 //  const url='https://tagebuch-server.vercel.app/'
    const url= 'http://localhost:8000/'

    const fetchUserData=async()=>{
        try{
            const response= await fetch(`${url}users`,{
                method: "GET",
                credentials:'include'
            })
            if(!response.ok){
                throw new Error(response.status)
            }
            const result= await response.json()
            if(result.success){
                setUserData(result.userData)
                setIsLogin(true)
            }
            else{
                setIsLogin(false)
                setUserData([])
            }
        }catch(e){
            console.log(e)
        }

    }
    const value={
        isLogin, setIsLogin,
        userData, setUserData,
        url,loginModus, setLoginModus
    }


    useEffect(()=>{
        fetchUserData()
    },[])
    return(
        <AppContext.Provider value={value}>{children}</AppContext.Provider>
    )

}