
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext';

const Login = ({onLoginSuccess}) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await login(formData);
      setFormData({ username: '', password: '' });
      
      // Only navigate if login is successful
      if (onLoginSuccess) {
        onLoginSuccess();
        navigate('/manager/dashboard');
      }
    } catch (error) {
      console.error('Error logging in:', error);
  
      // Check if the error status is 401 (Unauthorized)
      if (error.response && error.response.status === 401) {
        setErrorMessage('Invalid username or password');
      } else {
        // Handle other errors if needed
        setErrorMessage('An error occurred during login');
      }
    }
  };

  return (
    <>
    <div className='login-body'>
      <div className="login-container">
        <h2>Login</h2>
        {errorMessage && <span className="error" style={{color:'red',paddingLeft:'30px'}}>{errorMessage}</span>}
        <form onSubmit={handleSubmit} className="formcontainer">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            required
          />
          {errors.username && <span className="error">{errors.username}</span>}
          <br />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Password"
          />
          {errors.password && <span className="error">{errors.password}</span>}
          <br />
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/">Sign Up</Link>
        </p>
        <p>
          <Link to="/forgot-password">Forgot Password?</Link>
        </p>
      </div>
      </div>
    </>
  );
};

export default Login;
