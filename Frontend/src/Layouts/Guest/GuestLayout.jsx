import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../../context/ContextProvider'

function GuestLayout() {
    const {User, token} = useStateContext()

    if(token){
        return <Navigate to={'/dashboard'} />
    }
  return (
    <>
        <Outlet />
    </>
  )
}

export default GuestLayout