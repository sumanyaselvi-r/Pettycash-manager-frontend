// auth-context.js
import axios  from 'axios';

import React, { createContext, useContext, useState ,useEffect} from 'react';

const AuthContext = createContext();
const getStoredUser = () => {
  const storedUser = localStorage.getItem('user');
  return storedUser ? JSON.parse(storedUser) : { userId: null, username: null, token: null, isAuthenticated: false };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (userData) => {
    try {
      // Make a request to your server for authentication
      const response = await axios.post('https://pettycashbackend.onrender.com/api/login', {
        username: userData.username,
        password: userData.password,
      });
  
      const { userId, username, token } = response.data.user;
  
      // Set the user data and token in the state
      setUser({
        userId,
        username,
        token,
        isAuthenticated: true,
      });
      setIsAuthenticated(true);
      
    } catch (error) {
      console.error('Error during login:', error);
  
      // Ensure the login function rejects the promise when there is an error
      throw error;
    }
  };

  const logout = () => {
    axios.post('https://pettycashbackend.onrender.com/api/logout')
      .then(() => {
        setUser(null);
        setUser({ isAuthenticated: false });
      })
      .catch((error) => {
        console.error('Error logging out:', error);
      });

   
   
  };
  useEffect(() => {
    // Store the user in local storage
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);
  return (
    <AuthContext.Provider value={{ user, login, logout,  isAuthenticated, }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
