// src/components/Search.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from '../logo.png';

function Search() {
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage(''); // Clear any previous error messages
    try {
      const response = await axios.get(`https://api.github.com/users/${username}`);
      if (response.data) {
        navigate(`/user/${username}`);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      setErrorMessage('User not found');
    }
  };

  return (
    <div>
      <img src={logo} alt="GitHub Finder Logo" className="logo" />
      <h1> GitHub Finder</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="GitHub Username" 
            required 
          />
          <button type="submit">Search</button>
        </div>
        
        <div className="error-container">
          <div className="error-message">{errorMessage}</div>
        </div>
        
      </form>
    </div>
  );
}

export default Search;
