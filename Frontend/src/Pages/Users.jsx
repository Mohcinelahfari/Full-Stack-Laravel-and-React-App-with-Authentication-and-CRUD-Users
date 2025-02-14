import React, { useEffect, useState } from 'react';
import axiosClient from '../axios/axios';
import { Link } from 'react-router-dom';

function Users() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    setLoading(true);
    axiosClient.get('/users').then(({ data }) => {
      setLoading(false);
      setUsers(data.data);
    }).catch(() => {
      setLoading(false);
    });
  };



  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await axiosClient.delete(`/users/${id}`);
      getUsers(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <Link
        to={'/users/new'}
        className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
      >
        Create New User
      </Link>

      {loading ? (
        <div className="flex justify-center items-center h-20">
          <div className="w-10 h-10 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 rounded-lg shadow-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border">ID</th>
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Email</th>
                <th className="py-2 px-4 border">Created At</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="text-center hover:bg-gray-50">
                  <td className="py-2 px-4 border">{user.id}</td>
                  <td className="py-2 px-4 border">{user.name}</td>
                  <td className="py-2 px-4 border">{user.email}</td>
                  <td className="py-2 px-4 border">{user.created_at}</td>
                  <td className="py-2 px-4 border">
                    <Link to={`/users/${user.id}`} className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-blue-600 transition"
                    >
                      Update
                    </Link>


                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Users;
