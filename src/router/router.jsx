import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import AuthLayout from "../layouts/AuthLayout";
import SignUpPage from "../pages/SignUpPage";
import LogInPage from "../pages/LogInPage";
import AllPosts from "../pages/AllPosts";
import User from "../layouts/User";
import CreatePost from "../pages/UserDashboard/CreatePost";
import UpdatePost from "../pages/UserDashboard/UpdatePost";
import MyProfile from "../pages/UserDashboard/MyProfile"
import MyPosts from "../pages/UserDashboard/MyPosts";
import Admin from "../layouts/Admin";
import AdminProfile from "../pages/AdminDashboard/AdminProfile";
import AdminMyPosts from "../pages/AdminDashboard/AdminMyPosts";
import ManageUsers from "../pages/AdminDashboard/ManageUsers";
import AdminCreatePost from "../pages/AdminDashboard/AdminCreatePost";
import ProtectedRoute from "./ProtectedRoute";




export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: '/auth',
                Component: AuthLayout,
                children: [
                    {
                        path: '/sign-up',
                        Component: SignUpPage
                    },
                    {
                        path: '/log-in',
                        Component: LogInPage
                    }
                ]
            },
            {
                path: '/all-posts',
                Component: AllPosts
            },
            {
                path: '/user-dashboard',
                element:<User></User>,
                children: [
                    {
                        path: '/create-post',
                        Component: CreatePost
                    },
                    {
                        path: '/update-post/:id',
                        Component: UpdatePost
                    },
                    {
                        path: '/my-profile',
                        Component: MyProfile
                    },
                    {
                        path: '/my-posts',
                        Component: MyPosts
                    }
                ]
            },
            {
                path: '/admin-dashboard',
                Component: Admin,
                children: [
                    {
                        path: '/my-profile',
                        Component: AdminProfile
                    },
                    {
                        path: '/my-posts',
                        Component: AdminMyPosts
                    },
                    {
                        path: '/manage-users',
                        Component: ManageUsers
                    },
                    {
                        path: '/create-posts',
                        Component: AdminCreatePost
                    }
                ]
            }
        ]
    },
]);