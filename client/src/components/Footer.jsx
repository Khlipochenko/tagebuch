import { FaGithub } from "react-icons/fa6";

export const Footer=()=>{
    return(
        <div className="fixed bottom-0 w-screen h-auto  bg-teal-800 py-2  text-white px-4  flex justify-between items-center">
        <p>
        © 2025 Panova Natalia – Alle Rechte vorbehalten.</p>
        <a className="px-4 text-xl  sm:hover:text-red-500 sm:hover:scale-110" href="https://github.com/Khlipochenko" target="_blank"><FaGithub /></a>
        </div>
    )
}