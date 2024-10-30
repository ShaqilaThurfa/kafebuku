import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";



export default function RegisterPage() {

  const [fullName, setfullName] = useState("")
  const [email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleOnSubmit = async (event) => {
    event.preventDefault()

    try {
      
      console.log(fullName, Password, 'ini data');

      await axios.post("http://localhost:3001/user/register", {
        fullName,
        email,
        Password
      })
      console.log("register success");
      
      navigate("/login")

    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <div>
      <form onSubmit={handleOnSubmit} className="mx-auto w-50 gap-5 my-5">
        <h1 className="py-5">Register Page</h1>
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">
            Full Name
          </label>
          <input
            name="fullName"
            type="text"
            className="form-control"
            id="fullName"
            aria-describedby="FullName"
            value={fullName}
            onChange={e => setfullName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
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
          <label htmlFor="exampleInputPassword1" className="form-label">
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
        <button type="submit" className="btn btn-primary my-5">
          Submit
        </button>
        
        <p className="mx-auto">Do you have an account? <Link to= "/login" className="text-decoration-none">Login</Link></p>

      </form>

      
      
    </div>
  );
}
