import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2'

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:3001/user/login", {
        email,
        Password,
      });

      console.log(data);
      localStorage.setItem("access_token", data.access_token);
      navigate("/");
    } catch (error) {
      Swal.fire({
        text: error.response ? error.response.data.message : 'Something went wrong!',
      });
    }
  };

  async function handleCredentialResponse(response) {
    const { data } = await axios.post(`http://localhost:3001/user/googlelogin`, null, {
      headers: {
        token: response.credential,
      },
    });

    localStorage.setItem("access_token", data.access_token);
    navigate("/")
  }

  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: googleClientId,
      callback: handleCredentialResponse,
    });
    window.google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" }
    );
    window.google.accounts.id.prompt();
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", backgroundColor: "#F5F5DC" }}>
      <form onSubmit={handleOnSubmit} className="w-50 bg-light p-4 rounded shadow">
        <h1 className="text-center mb-4" style={{ color: "#8B4513" }}>Login Page</h1>
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
        <div className="mb-3">
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
        <button type="submit" className="btn btn-primary my-3" style={{ backgroundColor: "#8B4513", borderColor: "#8B4513" }}>
          Login
        </button>

        <p className="text-center">
          You do not have an account yet? <Link to="/register" className="text-decoration-none" style={{ color: "#8B4513" }}>Register</Link>
        </p>

        <div id="buttonDiv" className="justify-center"></div>
      </form>
    </div>
  );
}
