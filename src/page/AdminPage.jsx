import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import API_BASE_URL from "../config";

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/admin/all-users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      console.log("Fetched users:", data);
      setUsers(data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error.response
          ? error.response.data.message
          : "Something went wrong!",
      });
      navigate("/");
    }
  };

  const handleOnMakeUser = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to turn this user into User?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, turn into User!",
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.put(
          `${API_BASE_URL}/admin/turn-into-user/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === id ? { ...user, role: "user" } : user
          )
        );
        Swal.fire("Success!", "The user is now a User.", "success");
      } catch (error) {
        Swal.fire({
          icon: "error",
          text: error.response
            ? error.response.data.message
            : "Something went wrong!",
        });
      }
    }
  }

  const handleOnMakeAdmin = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to promote this user to Admin?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make Admin!",
    });

    if (result.isConfirmed) {
      try {
        await axios.put(
          `${API_BASE_URL}/admin/add-admin/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === id ? { ...user, role: "Admin" } : user
          )
        );
        Swal.fire("Success!", "The user is now an Admin.", "success");

      } catch (error) {
        Swal.fire({
          icon: "error",
          text: error.response
            ? error.response.data.message
            : "Something went wrong!",
        });
      }
    }
  };

  const handleOnBanUser = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to ban this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, ban it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.put(
          `${API_BASE_URL}/admin/ban/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        Swal.fire("Banned!", "The user has been banned.", "success");
        fetchUsers();
      } catch (error) {
        Swal.fire({
          icon: "error",
          text: error.response
            ? error.response.data.message
            : "Something went wrong!",
        });
      }
    }
  };

  const handleOnUnbannedUser = async (id) => {
    try {
      await axios.put(
        `${API_BASE_URL}/admin/unban/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      fetchUsers();
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error.response
          ? error.response.data.message
          : "Something went wrong!",
      });
    }
  };

  useEffect(() => {
    fetchUsers();
  },[]);

  return (
    <div className="container mx-auto my-5 px-4">
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-center">#</th>
            <th className="border border-gray-300 px-4 py-2 text-center">
              Full Name
            </th>
            <th className="border border-gray-300 px-4 py-2 text-center">
              Email
            </th>
            <th className="border border-gray-300 px-4 py-2 text-center">
              Status
            </th>
            <th className="border border-gray-300 px-4 py-2 text-center">
              Actions
            </th>
            <th className="border border-gray-300 px-4 py-2 text-center">
              Role
            </th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr
                key={user.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } hover:bg-gray-50`}
              >
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {index + 1}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {user.fullName}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {user.email}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <span
                    className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                      user.status === "active"
                        ? "bg-green-500 text-white"
                        : "bg-gray-400 text-white"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <div className="flex flex-wrap justify-center gap-2">
                    {user.status === "active" ? (
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-3 py-1 rounded"
                        onClick={() => handleOnBanUser(user.id)}
                      >
                        Ban
                      </button>
                    ) : (
                      <button
                        className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-semibold px-3 py-1 rounded"
                        onClick={() => handleOnUnbannedUser(user.id)}
                      >
                        Unban
                      </button>
                    )}
                    {user.role === "user" ? (
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded"
                        onClick={() => handleOnMakeAdmin(user.id)}
                      >
                        Make Admin
                      </button>
                    ) : (
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded"
                        onClick={() => handleOnMakeUser(user.id)}
                      >
                        Make User
                      </button>
                    )}
                  </div>
                </td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  <span
                    className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                      user.role === "Admin"
                        ? "bg-green-500 text-white"
                        : "bg-gray-400 text-white"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="6"
                className="border border-gray-300 px-4 py-2 text-center"
              >
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
