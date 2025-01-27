import React, { useState } from 'react'
import axiosClient from '../axios/axios'

function Users() {
  const [Loading, setLoading] = useState(false)


  useEffect(() => {
    getUsers()
  }, [])
  const getUsers = () => {
    setLoading(true)
    axiosClient.get('/users').then(({data}) => {
      setLoading(false)
      console.log(data);
    })
  }
  return (
    <>
      users


    </>
  )
}

export default Users