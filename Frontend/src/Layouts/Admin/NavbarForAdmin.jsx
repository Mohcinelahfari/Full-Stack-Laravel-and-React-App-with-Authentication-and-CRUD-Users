import React, { useEffect } from "react";
import axiosClient from "../../axios/axios";
import { useStateContext } from "../../context/ContextProvider";

const NavbarForAdmin = () => {
    const {setToken, setUser, User} = useStateContext()
  const handleLogout = (e) => {
    e.preventDefault()
    axiosClient.post('/logout').then(({data}) => {
        setToken(null)
        setUser({})
    })
    console.log("User logged out");
  };

  useEffect(() => {
    axiosClient.get('/user').then(({data}) => {
        setUser(data)
        console.log(User);
        
    })
  },[])

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-2xl font-bold">
              MyApp
            </a>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <a
              href="/home"
              className="hover:bg-blue-500 px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </a>
            <a
              href="/about"
              className="hover:bg-blue-500 px-3 py-2 rounded-md text-sm font-medium"
            >
              About
            </a>
            <a
              href=""
              className="hover:bg-blue-500 px-3 py-2 rounded-md text-sm font-medium"
            >
              {User.name}
            </a>
          </div>

          {/* Logout Button */}
          <div>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarForAdmin;
