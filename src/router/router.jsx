import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import AuthLayout from "../layouts/AuthLayout";
import SignUp from "../pages/SignUp";
import LogIn from "../pages/LogIn";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children:[
            {
                index:true,
                Component:Home
            }
        ]
    },
    {
        path:'/auth',
        Component: AuthLayout,
        children:[
            {
                path : '/auth/signup',
                Component:SignUp
            },
            {
                path : '/auth/login',
                Component :LogIn
            }
        ]
    },
    
]);