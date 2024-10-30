import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"


export default function RegisterPage() {

  const [fullName, setfullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleOnSubmit = async (event) => {
    event.preventDefault()

    try {
      
      console.log(fullName, password, 'ini data');

      await axios.post("http://localhost:3000/register", {
        fullName,
        email,
        password
      })
  
      navigate("/login")

    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <>
      <form onSubmit={handleOnSubmit} className="mx-auto w-50 gap-5 my-5">
        <h1 className="py-5">Register Page</h1>
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">
            Full Name
          </label>
          <input
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
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary my-5">
          Submit
        </button>
        
        <p className="mx-auto">Do you have an account? <Link to= "/login" className="text-decoration-none">Login</Link></p>

      </form>

      
      
    </>
  );
}
