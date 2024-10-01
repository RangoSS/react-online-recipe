import React, { useState } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import Navbar from './Navbar';
import './mystyles/style.css';

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  // Function to check login credentials
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Fetch user data from JSON server using username
      const response = await axios.get(`http://localhost:5000/users?username=${loginData.username}`);
      const user = response.data[0]; // Assume the first user is the one we want

      if (user) {
        // Decrypt the password stored on the server
        const decryptedPassword = CryptoJS.AES.decrypt(user.password, 'secretKey').toString(CryptoJS.enc.Utf8);

        // Check if the entered password matches the decrypted one
        if (decryptedPassword === loginData.password) {
          // Store user information in localStorage
          localStorage.setItem('user', JSON.stringify(user));

          // Redirect to the home page
          navigate('/recipe'); // Redirect to home page
        } else {
          setError('Invalid credentials!'); // Set error message for incorrect password
        }
      } else {
        setError('User not found!'); // Set error message for user not found
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred during login.');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="col-md-6">
      
        <h2 className="text-center mb-4">Login</h2>
        <div className='myform'>
          <form onSubmit={handleLogin} className="form-group">
            <div className="mb-3">
              <label>Username</label>
              <input
                type="text"
                name="username"
                className="form-control"
                value={loginData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={loginData.password}
                onChange={handleChange}
                required
              />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Show error message if any */}
            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-primary">Login</button>
              <a className="btn btn-success" href="/register">Register</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
