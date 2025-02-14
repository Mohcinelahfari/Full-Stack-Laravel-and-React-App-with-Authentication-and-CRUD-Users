import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../axios/axios";

export default function UserForm() {
  const navigate = useNavigate();
  let { id } = useParams();
  const [user, setUser] = useState({
    id: null,
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      axiosClient
        .get(`/users/${id}`)
        .then(({ data }) => {
          setUser(data.data); // Ensure correct response format
        })
        .catch(() => {})
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  const onSubmit = (ev) => {
    ev.preventDefault();
    setErrors(null);

    if (user.id) {
      axiosClient
        .put(`/users/${user.id}`, user)
        .then(() => {
          navigate("/users");
        })
        .catch((err) => {
          if (err.response?.status === 422) {
            setErrors(err.response.data.errors);
          }
        });
    } else {
      axiosClient
        .post("/users", user)
        .then(() => {
          navigate("/users");
        })
        .catch((err) => {
          if (err.response?.status === 422) {
            setErrors(err.response.data.errors);
          }
        });
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">
        {user.id ? `Update User: ${user.name}` : "New User"}
      </h1>

      {loading && <div className="text-center text-gray-500">Loading...</div>}

      {errors && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4 rounded">
          {Object.keys(errors).map((key) => (
            <p key={key} className="text-sm">
              {errors[key][0]}
            </p>
          ))}
        </div>
      )}

      {!loading && (
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600">Name</label>
            <input
              value={user.name}
              onChange={(ev) => setUser({ ...user, name: ev.target.value })}
              placeholder="Enter name"
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-600">Email</label>
            <input
              value={user.email}
              onChange={(ev) => setUser({ ...user, email: ev.target.value })}
              placeholder="Enter email"
              type="email"
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-600">Password</label>
            <input
              type="password"
              onChange={(ev) => setUser({ ...user, password: ev.target.value })}
              placeholder="Enter password"
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-600">Confirm Password</label>
            <input
              type="password"
              onChange={(ev) =>
                setUser({ ...user, password_confirmation: ev.target.value })
              }
              placeholder="Confirm password"
              className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
            Save
          </button>
        </form>
      )}
    </div>
  );
}
