import { useNavigate, useRouteError } from "react-router-dom"

export const ErrorPage=()=>{
    const error=useRouteError();
    const navigate=useNavigate()
    return[
        <div className="flex items-center flex-col justify-center h-screen w-screen">
            <h1 className="text-2xl font-medium">Oops!</h1>
            <p>
                <i>{error.statusText||error.message}</i>
            </p>
            <button className="drop-shadow-lg px-4 mt-2  py-1 rounded bg-teal-500  text-white sm:hover:bg-teal-900" onClick={()=>navigate('/home')}>Züruck

            </button>
        </div>
    ]
}