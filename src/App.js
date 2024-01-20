// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Manager from './Manager';
import Registration from './SignUp'
import ForgotPassword from './ForgetPassword';
import ResetPassword from './RestPassword';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  // Function to set authenticated status after successful login
  const handleLoginSuccess = () => {
    setAuthenticated(true);
  };

  return (
    
 
      <Routes>
        {/* Public route: Login */}
        <Route
          path="/"
          element={<Registration/>}/>
        <Route
          path="/login"
          element={<Login onLoginSuccess={handleLoginSuccess} />}
        />
        <Route path='/forgot-password' element={<ForgotPassword/>}/>Forgot Password?
        <Route path="/reset-password/:token" element={<ResetPassword/>}/>
        {/* Protected route: Manager (requires authentication) */}
        <Route
          path="/manager/*"
          element={authenticated ? <Manager /> : <Navigate to="/login" />}
        />

        {/* Add other routes as needed */}
      </Routes>
    
  );
};

export default App;
