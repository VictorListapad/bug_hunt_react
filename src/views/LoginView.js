import { useContext, useState } from "react"
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext"

const LoginView = () => {
  const navigate = useNavigate();
  const { loginUser } = useContext(AuthContext);
  const [user, setUser] = useState({
    password: "",
    email: ""
  })

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    await loginUser(user);
    setUser({
      email: "",
      password: ""
    })
    navigate("/")
  }

  return (
    <div className="container mt-5">
      <form className="form">
        <h2>Login View</h2>
        <input 
          name="email"
          value={user.email}
          onChange={handleChange}
          className="form-control" 
          type="text" 
          placeholder="email" 
        />
        <input 
          name="password"
          value={user.password}
          onChange={handleChange}
          className="form-control" 
          type="password" 
          placeholder="password" 
        />
        <button 
          onClick={handleSubmit}
          className="form-control btn btn-outline-dark"
          >Log In
        </button>
      </form>
    </div>
  )
}

export default LoginView
