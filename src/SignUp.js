
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal';

import signupimage from './images/image4.jpg'

const Registration = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [errorMessage,seterrorMessage]=useState('')

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic form validation
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      Object.keys(newErrors).forEach((fieldName) => {
        const inputElement = document.querySelector(`[name=${fieldName}]`);
        if (inputElement) {
          inputElement.classList.add('error');
        }
      });

      return;
    }
    document.querySelectorAll('.error').forEach((input) => {
      input.classList.remove('error');
    });

  };
  const handleRegister = async () => {
    try {
      await axios.post('/api/register', formData);
      console.log('Registration successful!');
      setModalIsOpen(true);
      seterrorMessage('')
      setFormData({
        username: '',
        email: '',
        password: '',
       
      });
      


    } catch (error) {
      console.error('Error registering:', error);
      
      if (error.response && error.response.data && error.response.data.message) {
        seterrorMessage(error.response.data.message);
      } else {
        seterrorMessage('An error occurred during registration.');
      }
    }
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
   const componentStyle = {
    display: 'flex',
    justifyContent: 'space-around',
  };

  const columnStyle = {
    flex: 1,
    maxWidth: '400px', 
    padding: '20px',
    boxSizing: 'border-box',
  };

  return (
    <>
    <br></br>
    <h1 style={{textAlign:'center'}}>Petty Cash Manager</h1>
    <div className='signup-container'>
   
    <div className='column-container'>
    <div className='first-column'>
   
     
   <img src={signupimage} />
    </div>
    <div className='second-column'>
      <h2 >Signup</h2>
      {errorMessage && <span >{errorMessage}</span>}
      <form onSubmit={handleSubmit} >
        <input
          type="text"
          name="username"
          value={formData.username}
          placeholder="Username"
          onChange={handleChange}
          required
         
        />
        {errors.username && <span>{errors.username}</span>}
        <br />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
       
        />
        {errors.email && <span >{errors.email}</span>}
        <br />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        
        />
        {errors.password && <span >{errors.password}</span>}
        <br />
        <button type="submit" onClick={handleRegister} >
          Signup
        </button>
        <br></br>
      
      </form>
      <p >
        Already have an account? <Link to="/login" >Login</Link>
      </p>
    </div>
    </div>
  <div>
  </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Registration Successful"
      >
        <h2>Registration Successful!</h2>
        <p>Your account has been created successfully.</p>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
    </>
  );
  
};

const styles = {
  
  container: {
    display: 'flex',
  justifyContent:'center',
  
    
  },
  column: {
    flex: 1,
    maxWidth: '400px',
    padding: '20px',
    boxSizing: 'border-box',
  },
  header: {
    marginBottom: '20px',
  },
  signupContainer: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  signupTitle: {
    fontSize: '24px',
    marginBottom: '15px',
    color: '#333',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    marginBottom: '10px',
    padding: '8px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginBottom: '10px',
  },
  loginLink: {
    marginTop: '15px',
  },
  link: {
    color: '#4CAF50',
  },
  signuppagecontainer:{
    justifyContent:'center',
    alignItem:'center',
    

  }
};

export default Registration;
