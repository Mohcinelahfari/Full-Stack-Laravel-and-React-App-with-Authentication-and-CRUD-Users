import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../../context/ContextProvider'
import NavbarForAdmin from './NavbarForAdmin'
import FooterForAdmin from './FooterForAdmin'

function AdminLayout() {
    const {User, token} = useStateContext()

    if(!token){
        return <Navigate to={'/login'} />
    }
   return (
    <>
        <NavbarForAdmin />
        <Outlet />
        <FooterForAdmin />
    </>
  )
}

export default AdminLayout