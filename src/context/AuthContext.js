import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import apiHelper from '../apiHelper/apiHelper';

export const AuthContext = createContext({});

const AuthProvider = ({children}) => {
  const jwt_string = "jwtbughunt";
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState({});

  useEffect(() => {
    checkedLogged()
  }, [])

  useEffect(() => {
    revalidateToken();
  }, [loggedIn])

  const checkedLogged = () => {
    const tokenValue = localStorage.getItem(jwt_string);
    return tokenValue ? setLoggedIn(true) : setLoggedIn(false);
  }

  const setLocalStorageToken = (data) => {
    localStorage.setItem(jwt_string, JSON.stringify(data));
  }

  const loginUser = async (obj) => {
    try {
      const response = await apiHelper.post("/auth/login", obj);
      const { data } = response;
      setUser(data.user);
      setLocalStorageToken(data);
      setLoggedIn(true)
      toast.success("Successfully Loged In")
    } catch (error) {
      toast.error(`${error.response.data.message}`);
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
  
  const revalidateToken = async () => {
    // make sure the token is valid otherwise log user out
    // this can happen if you are testing it in local production
    // and then test in productio.
    if (!loggedIn) return;
    try {
      const response = await apiHelper.post('/auth/renew');
      const { data } = response;
      setUser(data.user);
      setLocalStorageToken(data);
    } catch (error) {
      localStorage.removeItem(jwt_string);
      console.log(error);
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