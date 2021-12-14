import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext"

const LoginView = () => {
  const { loginUser } = useContext(AuthContext);
  const [user, setUser] = useState({
    name: "",
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
