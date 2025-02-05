
import { GoDotFill } from "react-icons/go";
import { NavLink } from "react-router-dom";
export const EmailBestatigungSeite=()=>{
 
    return(
        <div className="container flex flex-col items-center mt-24 gap-4 mx-6  text-green-900 text-lg max-sm:text-sm max-sm:px-14">
        <h2 className=" text-3xl mb-5 text-lime-950 max-sm:text-lg">Danke  für deine Registrierung!</h2>

       <p className="text-xl max-sm:text-sm"> Fast geschafft! Bitte überprüfe dein E-Mail-Postfach . Wir haben dir eine Bestätigungs-E-Mail geschickt.</p>
        <ul className="mt-0">
        <li className="flex items-center gap-2"><GoDotFill  /> Öffne dein E-Mail-Postfach</li>
        <li className="flex items-center gap-2"><GoDotFill   /> Suche nach unserer E-Mail</li>
        <li className="flex items-center gap-2"> <GoDotFill   /> Klicke auf den Bestätigungslink</li>
        </ul>
        
       <p> Falls du die E-Mail nicht findest, schau bitte im Spam-Ordner nach.</p>
        <p>Sobald du deine E-Mail-Adresse bestätigt hast, kannst du dich einloggen und loslegen!</p>

         <button className=' mt-10 drop-shadow-lg  py-1 rounded bg-teal-500  text-white sm:hover:bg-teal-900 w-24'>
                <NavLink to='/home'>Home</NavLink></button>
               
        </div>
    )

} 