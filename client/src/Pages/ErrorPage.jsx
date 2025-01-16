import { useNavigate, useRouteError } from "react-router-dom"

export const ErrorPage=()=>{
    const error=useRouteError();
    const navigate=useNavigate()
    return[
        <div>
            <h1>Oops!</h1>
            <p>
                <i>{error.statusText||error.message}</i>
            </p>
            <button onClick={()=>navigate('/home')}>Go back

            </button>
        </div>
    ]
}