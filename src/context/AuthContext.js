import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import apiHelper from '../apiHelper/apiHelper';

export const AuthContext = createContext({});

const AuthProvider = ({children}) => {
  const jwt_string = "jwtbughunt";
  const [loggedIn, setLoggedIn] = useState(false)
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  useEffect(() => {
    checkedLogged()
  }, [])

  const checkedLogged = () => {
    const tokenValue = JSON.parse(localStorage.getItem(jwt_string));
    setUserName(tokenValue.user.name);
    return tokenValue ? setLoggedIn(true) : setLoggedIn(false);
  }

  const setLocalStorageToken = (data) => {
    localStorage.setItem(jwt_string, JSON.stringify(data));
  }

  const loginUser = async (obj) => {
    const response = await apiHelper.post("/auth/login", obj);
    if (response.data) {
      setLocalStorageToken(response.data);
      toast.success("Successfully Loged In")
      setLoggedIn(true);
      setUser({
        name: "",
        email: "",
        password: "",
        role: "",
      })
    }
  }

  const signUpUser = async (obj) => {
    const response = await apiHelper.post("/auth/signup", obj);
    if (response.data) {
      setLocalStorageToken(response.data);
      toast.success("Signed Up & Logged In")
      setLoggedIn(true);
      setUser({
        name: "",
        email: "",
        password: "",
        role: ""
      })
    }
  }

  const logOutUser = () => {
    localStorage.removeItem(jwt_string);
    toast.warning("Successfully Logged Out")
    setLoggedIn(false);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        userName,
        loggedIn,
        loginUser,
        logOutUser,
        signUpUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;