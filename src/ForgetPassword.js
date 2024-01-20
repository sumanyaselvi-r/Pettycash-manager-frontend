
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic form validation
    if (!email.trim()) {
      setError('Email is required');
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Invalid email format');
      return;
    }

    // Add forgot password logic here (e.g., API call)
    console.log('Forgot Password submitted:', email);
  };
  const handleForgotPassword = async () => {
    try {
      const response = await axios.post('/api/forgot-password', { email });
      setMessage(response.data.message);
    } catch (error) {
      console.error(error);
      setMessage('Failed to send reset email');
    }
  };
  return (
    <div className='login-body'>
    <div className='login-container' >
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit} className='formcontainer'>
       
          <input type="email" value={email} onChange={handleChange}  placeholder='Enter your Email' required />
       
        {error && <span className="error">{error}</span>}
        <br />
        <button type="submit" onClick={handleForgotPassword}>Reset Password</button>
      </form>
      <p>
        Remember your password? <Link to="/login">Login</Link>
      </p>
    </div>
    </div>
  );
};

export default ForgotPassword;
