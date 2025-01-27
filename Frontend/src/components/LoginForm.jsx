import { useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axiosClient from "../axios/axios";
import { useStateContext } from "../context/ContextProvider";

export default function LoginForm() {

  const {setToken, setUser} = useStateContext()
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const [errors, setErrors] = useState({});
    const passwordConfirmationRef = useRef()
    const handelSubmit = (e) => {
        e.preventDefault()
        setErrors({});
        const payload = {
            email : emailRef.current.value,
            password : passwordRef.current.value,
        }


        axiosClient.post('/login', payload)
        .then(({data}) => {
          setUser(data.user)
          setToken(data.token)
          
        })
        .catch(({ response }) => {
          if (response && response.status === 422) {
              setErrors(response.data.errors); // Set validation errors from the API
          } else if (response && response.status === 401) {
              console.log(response.data.message);
          }
      });
        
    }
    return (
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="Your Company"
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
              className="mx-auto h-10 w-auto"
            />
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Login To your Account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form action="#" method="POST" onSubmit={handelSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    ref={emailRef}
                    autoComplete="email"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              {errors.email && <p className="text-red-500 text-sm">{errors.email[0]}</p>}

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                    Password
                  </label>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    ref={passwordRef}
                    autoComplete="current-password"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              {errors.password && <p className="text-red-500 text-sm">{errors.password[0]}</p>}

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Login
                </button>

              </div>
            </form>
            <Link to={'/register'}>Register</Link>
          </div>
        </div>
      </>
    )
  }
  