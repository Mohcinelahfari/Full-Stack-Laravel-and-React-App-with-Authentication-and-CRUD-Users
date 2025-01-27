import React from 'react'
import { Link } from 'react-router-dom'

function AdminDashboard() {
  return (
    <div>AdminDashboard
      <Link to={'/users'}>Users</Link>
    </div>
  )
}

export default AdminDashboard