import { createContext, useEffect, useState } from 'react';
import UserAPI from '../services/user.service';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

const LOCAL_STORAGE_AUTH = 'tokenAuth';

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const storeSetToken = (token) => {
    localStorage.setItem(LOCAL_STORAGE_AUTH, token);
  };

  const destroyToken = () => {
    localStorage.removeItem(LOCAL_STORAGE_AUTH);
  }

  const authentication = () => {
    const token = localStorage.getItem(LOCAL_STORAGE_AUTH);

    if (token) {
      UserAPI
        .me(token)
        .then((user) => {
          setUser(user);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      setUser(null);
      navigate('/');
    }
  };

  const logOut = () => {
    destroyToken();
    authentication();
  }

  useEffect(() => {
    authentication();
  }, [])

  return (
    <AuthContext.Provider
      value={{ authentication, storeSetToken, logOut, user }}>
      {props.children}
    </AuthContext.Provider>
  )
};