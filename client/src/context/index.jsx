import { createContext, useEffect, useState } from 'react';
import { TOKEN, USER } from '../constant/auth';

export const AuthContext = createContext({
  user: null,
  token: null,
  saveAuthData: () => {
    throw new Error('saveAuthData function must be overriden by AuthProvider');
  },
  deleteAuthData: () => {
    throw new Error(
      'deleteAuthData function must be overriden by AuthProvider'
    );
  },
  isAuthenticated: false,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const initializeAuth = () => {
      const storedToken = localStorage.getItem(TOKEN);
      const storedUser = localStorage.getItem(USER);

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    };

    initializeAuth();
  }, []);

  const saveAuthData = (accessToken, user) => {
    localStorage.setItem(TOKEN, accessToken);
    localStorage.setItem(USER, JSON.stringify(user));
    setToken(accessToken);
    setUser(user);
  };

  const deleteAuthData = () => {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(USER);
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    saveAuthData,
    deleteAuthData,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
