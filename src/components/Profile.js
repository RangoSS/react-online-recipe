import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './mystyles/style.css';

const Profile = () => {
  const [userData, setUserData] = useState({
    name: '',
    surname: '',
    email: '',
    username: '',
    profilePic: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');

  const loggedInUser = JSON.parse(localStorage.getItem('user')); // Get logged-in user from localStorage

  useEffect(() => {
    // Fetch logged-in user's data
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${loggedInUser.id}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to fetch user data.');
      }
    };

    fetchUserData();
  }, [loggedInUser.id]);

  // Handle input changes for the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // Handle form submission to update user data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/users/${loggedInUser.id}`, userData);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating user data:', error);
      setError('Failed to update profile.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card" style={{ width: '18rem' }}>
        <img
          src={`http://localhost:5000/images/${userData.profilePic}`}
          className="card-img-top rounded-circle"
          alt="Profile"
          style={{ width: '150px', height: '150px', objectFit: 'cover', margin: 'auto' }}
        />
        <div className="card-body">
          {!isEditing ? (
            <>
              <h5 className="card-title">{`${userData.name} ${userData.surname}`}</h5>
              <p className="card-text"><strong>Email:</strong> {userData.email}</p>
              <p className="card-text"><strong>Username:</strong> {userData.username}</p>
              <button className="btn btn-primary" onClick={() => setIsEditing(true)}>Edit Profile</button>
            </>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Surname</label>
                <input
                  type="text"
                  name="surname"
                  value={userData.surname}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  name="username"
                  value={userData.username}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <button type="submit" className="btn btn-success">Save Changes</button>
              <button
                type="button"
                className="btn btn-secondary ms-3"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </form>
          )}
        </div>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Profile;
