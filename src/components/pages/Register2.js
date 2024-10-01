import React, { useState } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import Navbar from '../Navbar';

const Register = () => {
  const [userData, setUserData] = useState({
    name: '',
    surname: '',
    email: '',
    username: '',
    password: ''
  });
  const [profilePicture, setProfilePicture] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    // Convert file to base64 string
    reader.onloadend = () => {
      setProfilePicture(reader.result); // base64 string
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const encryptedPassword = CryptoJS.AES.encrypt(userData.password, 'secretKey').toString();

    // Prepare user data with base64-encoded image and encrypted password
    const newUser = {
      id: Date.now(), // Unique ID for the user
      name: userData.name,
      surname: userData.surname,
      email: userData.email,
      username: userData.username,
      password: encryptedPassword,
      profilePicture: profilePicture // Store the base64-encoded profile picture
    };

    try {
      await axios.post('http://localhost:5000/users', newUser);
      alert('User registered successfully!');
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="form-group">
        <div className="mb-3">
          <label>Name</label>
          <input type="text" name="name" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Surname</label>
          <input type="text" name="surname" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" name="email" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Username</label>
          <input type="text" name="username" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" name="password" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Profile Picture</label>
          <input type="file" name="profilePicture" className="form-control" onChange={handleFileChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default Register;
