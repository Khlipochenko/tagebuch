import { createContext, useState } from "react";

export const AppContext=createContext()
export const AppContextProvider=({children})=>{
    const [isLogin, setIsLogin]=useState(false)
    const [userName, setUserName]=useState('')
    const url='https://tagebuch-server.vercel.app/'
    const value={
        isLogin, setIsLogin,
        userName, setUserName,
        url
    }
    return(
        <AppContext.Provider value={value}>{children}</AppContext.Provider>
    )

}