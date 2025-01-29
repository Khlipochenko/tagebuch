import { Navigate } from "react-router-dom";
import { ErrorPage } from "../Pages/ErrorPage";
import { Layout } from "../components/Layout";
import { createBrowserRouter } from "react-router-dom";
import { Home } from "../Pages/Home";
import { Write } from "../Pages/Write";
import { VerifizierungPage } from "../Pages/VerifizierungPage";
import { EmailBestatigungSeite } from "../Pages/EmailBestärigungPage";
export const router=createBrowserRouter([{

    path:'/',
    element:<Layout></Layout>,
errorElement:<ErrorPage></ErrorPage>,
children:[
    {
        index:true,
        element:<Navigate to ='home'></Navigate>
    },
    {
        path:"/home",
        element:<Home></Home>
    },
    {
        path:"/verify/:ver",
        element:<VerifizierungPage></VerifizierungPage>
    },
    {
        path:"/write",
        element:<Write></Write>
    },
    {
        path:"/email",
        element:<EmailBestatigungSeite></EmailBestatigungSeite>
    }
]


}])