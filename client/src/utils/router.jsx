import { Navigate } from "react-router-dom";
import { ErrorPage } from "../Pages/ErrorPage";
import { Layout } from "../components/Layout";
import { createBrowserRouter } from "react-router-dom";
import { Home } from "../Pages/Home";
import { Write } from "../Pages/Write";
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
        path:"/write",
        element:<Write></Write>
    }
]


}])