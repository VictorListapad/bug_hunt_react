import { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import logo from "../images/bug_hunt2.png";

const NavBar = () => {
  const { loggedIn, logOutUser, user } = useContext(AuthContext);

  return (
    <div>
      <Navbar className="customNavbar" collapseOnSelect expand="lg">
        <Container>
          <Navbar.Brand>
            <img src={logo} alt="" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/">Home</NavLink>
              {loggedIn && <NavLink to="/addPost">Add Post</NavLink>}
            </Nav>
            <Nav>
              {loggedIn ? (
                <>
                  <a style={{marginTop: 7}}>Welcome, {user.name}</a>
                  <button onClick={logOutUser} className="btn btn-outline-dakr">
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <NavLink to="/signup">Signup</NavLink>
                  <NavLink to="/login">Login</NavLink>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
