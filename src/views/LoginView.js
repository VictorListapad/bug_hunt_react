import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { Button, Form } from "react-bootstrap";

const LoginView = () => {
  const navigate = useNavigate();
  const { loginUser } = useContext(AuthContext);
  const [validated, setValidated] = useState(false);
  const [errors, setErros] = useState([]);
  const [user, setUser] = useState({
    password: "",
    email: "",
  });

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }
    const response = await loginUser(user);
    if (response?.errors) {
      setErros(response.errors);
    }
    setUser({
      email: "",
      password: "",
    });
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <Form
        className="form"
        onSubmit={handleSubmit}
        noValidate
        validated={validated}
      >
        <h2>
          <strong>Log In</strong>
        </h2>
        <Form.Group>
          <Form.Control
            value={user.email}
            onChange={handleChange}
            name="email"
            value={user.email}
            required
            type="email"
            placeholder="email"
          />
          <Form.Control.Feedback type="invalid">
            Email is Required
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Control
            name="password"
            value={user.password}
            onChange={handleChange}
            className="form-control"
            required
            type="password"
            placeholder="password"
          />
          <Form.Control.Feedback type="invalid">
            Password is Required
          </Form.Control.Feedback>
        </Form.Group>
        <Button className="form-control mt-3" type="submit">
          Log In
        </Button>
      </Form>
    </div>
  );
};

export default LoginView;
