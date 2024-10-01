// src/pages/Registration.js
import React, { useState } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import Navbar from '../Navbar';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    username: '',
    password: '',
    profilePic: null,
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePic: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const encryptedPassword = CryptoJS.AES.encrypt(formData.password, 'secretKey').toString();

    const userData = {
      name: formData.name,
      surname: formData.surname,
      email: formData.email,
      username: formData.username,
      password: encryptedPassword,
      profilePic: formData.profilePic.name,
    };

    try {
      await axios.post('http://localhost:5000/users', userData);
      alert('Registration successful!');
      navigate('/login'); // Redirect to login
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className="container mt-5">
      <Navbar />
      <h2 className="text-center mb-4">Register</h2>
      <div className="row justify-content-center">
        <div className="col-md-6"> {/* Set the form width to 50% (6 out of 12 columns) */}
          <form onSubmit={handleSubmit} className="form-group">
            <div className="mb-3">
              <label>Name</label>
              <input type="text" name="name" className="form-control" onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label>Surname</label>
              <input type="text" name="surname" className="form-control" onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label>Email</label>
              <input type="email" name="email" className="form-control" onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label>Username</label>
              <input type="text" name="username" className="form-control" onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input type="password" name="password" className="form-control" onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label>Profile Picture</label>
              <input type="file" name="profilePic" className="form-control" onChange={handleFileChange} />
            </div>
            <button type="submit" className="btn btn-primary">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
