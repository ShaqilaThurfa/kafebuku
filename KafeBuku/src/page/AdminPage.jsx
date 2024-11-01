import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3001/admin/all-users",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setUsers(data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error.response
          ? error.response.data.message
          : "Something went wrong!",
      });
    }
  };

  const handleOnDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/admin/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
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
  const handleOnBanUser = async (id) => {
    try {
      await axios.put(`http://localhost:3001/admin/ban/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
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
  }, []);

  return (
    <div className="container my-5">
      <h2 className="text-center" style={{ color: "#6F4C3E" }}>
        User List
      </h2>
      <table className="table table-striped mt-4" style={{ backgroundColor: "#F5F5DC" }}>
        <thead style={{ backgroundColor: "#D8CFC4" }}>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Full Name</th>
            <th scope="col">Email</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
            <th scope="col">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={user.id} style={{ backgroundColor: index % 2 === 0 ? "#FAF3E0" : "#F5F5DC" }}>
                <th scope="row">{index + 1}</th>
                <td>{user.fullName}</td>
                <td>{user.email}</td>
                <td>
                  <span
                    className={`badge ${
                      user.status === "active" ? "bg-success" : "bg-secondary"
                    } ms-2`}
                  >
                    {user.status}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-danger me-2"
                    onClick={() => handleOnDeleteUser(user.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-warning"
                    onClick={() => handleOnBanUser(user.id)}
                  >
                    Ban
                  </button>
                </td>
                <td>
                  <span
                    className={`badge ${
                      user.role === "Admin" ? "bg-success" : "bg-secondary"
                    } ms-2`}
                  >
                    {user.role}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
  
}
