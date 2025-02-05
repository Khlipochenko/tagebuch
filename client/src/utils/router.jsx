import { Navigate } from "react-router-dom";
import { ErrorPage } from "../Pages/ErrorPage";
import { Layout } from "../components/Layout";
import { createBrowserRouter } from "react-router-dom";
import { Home } from "../Pages/Home";
import { Write } from "../Pages/Write";
import { VerifizierungPage } from "../Pages/VerifizierungPage";
import { EmailBestatigungSeite } from "../Pages/EmailBestärigungPage";
import { NotizPage } from "../Pages/NotizPage";
import { EditPage } from "../Pages/EditPage";

import { ResetPassword } from "../Pages/ResetPassword";
import { EmailCheckPage } from "../Pages/EmailCheckPage";
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
    },
    {
        path:"/notiz/:id",
        element:<NotizPage></NotizPage>
    },{
        path:"/edit/:id",
        element:<EditPage/>
    },
    {
        path:"/reset/:token",
        element:<ResetPassword></ResetPassword>
    
    },
    {
        path:"/send-email",
        element:<EmailCheckPage></EmailCheckPage>
    
    }
    
]


}])