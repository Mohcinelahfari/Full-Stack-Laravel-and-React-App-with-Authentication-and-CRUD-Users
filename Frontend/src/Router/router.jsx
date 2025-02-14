import { createBrowserRouter } from "react-router-dom";
import HomePAge from "../Pages/HomePAge";
import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";
import ErrorPage from "../Pages/ErrorPage";
import AdminLayout from "../Layouts/Admin/AdminLayout";
import GuestLayout from "../Layouts/Guest/GuestLayout";
import Users from "../Pages/Users";
import AdminDashboard from "../Layouts/Admin/AdminDashboard";
import UserForm from "../components/UserForm";

const  router = createBrowserRouter([
    {
        element : <AdminLayout />,
        children : [
            {
                path : '/dashboard',
                element : <AdminDashboard />
            },
            {
                path : '/users',
                element : <Users />
            },
            {
                path: '/users/new',
                element: <UserForm key="userCreate" />
              },
              {
                path: '/users/:id',
                element: <UserForm key="userUpdate" />
              }
        ]
    },
    {
        path : '/',
        element : <GuestLayout />,
        children : [
            {
                path : '/login',
                element : <LoginPage />
            },
            {
                path : '/register',
                element : <RegisterPage />
            },
        ]
    },
    {
        path : '/',
        element : <HomePAge />
    },

    {
        path : '*',
        element : <ErrorPage />
    }
])


export default router