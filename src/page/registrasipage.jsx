import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import API_BASE_URL from "../config";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    //http://localhost:3001/user/register
    try {
      await axios.post(`${API_BASE_URL}/auth/register`, {
        fullName,
        email,
        Password,
      });
      console.log("Register success");
      navigate("/login");
    } catch (error) {
      Swal.fire({
        text: error.response ? error.response.data.message : 'Something went wrong!',
      });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", backgroundColor: "#F5F5DC" }}>
      <form onSubmit={handleOnSubmit} className="w-50 bg-light p-4 rounded shadow">
        <h1 className="text-center mb-4" style={{ color: "#8B4513" }}>Register Page</h1>
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label" style={{ color: "#8B4513" }}>
            Full Name
          </label>
          <input
            name="fullName"
            type="text"
            className="form-control"
            id="fullName"
            aria-describedby="FullName"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label" style={{ color: "#8B4513" }}>
            Email address
          </label>
          <input
            name="email"
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3" >
          <label htmlFor="exampleInputPassword1" className="form-label" style={{ color: "#8B4513" }}>
            Password
          </label>
          <input
            name="Password"
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={Password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary my-3" style={{ backgroundColor: "#8B4513", borderColor: "#8B4513", justifySelf:"center"}}>
          Register
        </button>
        
        <p className="text-center">
          Do you have an account? <Link to="/login" className="text-decoration-none" style={{ color: "#8B4513" }}>Login</Link>
        </p>
      </form>
    </div>
  );
}
