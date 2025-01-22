import { createContext, useContext, useState } from "react"

const StateContext = createContext({
    User : {},
    token : null,
    setToken : () => {},
    setUser : () => {}
})


function ContextProvider({children}) {
    const [User, setUser] = useState({})
    const [token, _setToken ] = useState(localStorage.getItem('ACCESS_TOKEN'))

    const setToken = (token) => {
        _setToken(token)
        if(token){
            localStorage.setItem('ACCESS_TOKEN', token)
        }else{
            localStorage.removeItem('ACCESS_TOKEN')
        }
    }
  return (
    <StateContext.Provider value={{
        User, token,setUser, setToken
    }}>
         {children}
    </StateContext.Provider>
  )
}

export default ContextProvider


export const useStateContext = () => useContext(StateContext)