import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"

export default function LoginPage() {

  const [email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleOnSubmit = async (event) => {
    event.preventDefault()

    try {
      
      const {data} = await axios.post("http://localhost:3001/user/login", {
        email,
        Password,
      })

      console.log(data)

      localStorage.setItem("access_token", data.access_token)

      console.log("access_token");
      
  
      // navigate("/")

    } catch (error) {
      console.log(error)
    }
  }


  async function handleCredentialResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    const { data } = await axios.post(`http://localhost:3001/user/googlelogin`, null, {
      headers: {
        token: response.credential
      }
    })

    localStorage.setItem("access_token", data.access_token)
    navigate("/")
  }

  useEffect(() => {

    google.accounts.id.initialize({
      client_id: "1050505246453-n8i7i8caqa6eq79np0lsddm12tmvcfjk.apps.googleusercontent.com",
      callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" }  
    );
    google.accounts.id.prompt(); 
  

  }, [])
  
    
  
  return (
    <>
      <form onSubmit={handleOnSubmit} className="mx-auto w-50 gap-5 my-5">
        <h1 className="py-5">Login Page</h1>
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
        <button type="submit" className="btn btn-primary my-3">
          Submit
        </button>

        <p>You do not have an account yet? <Link to= "/register" className="text-decoration-none">Register</Link></p>

        <div id="buttonDiv" className="justify-center"></div>

      </form>
    
    
    </>
  );
}
