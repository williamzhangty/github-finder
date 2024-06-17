// src/components/User.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from 'framer-motion';

function User() {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
 
  
  useEffect(() => {
    const token = process.env.REACT_APP_GITHUB_TOKEN; // Replace wigitth your actual GitHub API token
    const options = { headers: { Authorization: `Bearer ${token}` } };

    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(`https://api.github.com/users/${username}`, options);
        setUserData(userResponse.data);
        //console.log(userResponse.data); 
       
        const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos`, options);
                                              
        console.log(reposResponse.data); 
        setRepos(reposResponse.data);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUserData();
  }, [username]);

  if (!userData) return <p>Loading...</p>;

  return (
    <motion.div className='result-container' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

    <div className="user-container">
      <div className="avatar-container">
        <img src={userData.avatar_url} alt={`${userData.name} avatar`} className="avatar" />
      </div>
      <div className="user-details">
        <h1>{userData.name}</h1> {/* Username displayed below the avatar */}
      </div>
      <div className="stats">
        <div className="stat">
          <strong>{userData.public_repos}</strong>
          <span>REPOSITORIES</span>
        </div>
        <div className="stat">
          <strong>{userData.followers}</strong>
          <span>FOLLOWERS</span>
        </div>
        <div className="stat">
          <strong>{userData.following}</strong>
          <span>FOLLOWING</span>
        </div>
      </div>
      <a href={userData.html_url} target="_blank" rel="noopener noreferrer" className="github-link">
        Go to GitHub
      </a>
      
    </div>
    <div className="repo-list">
      {repos
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) // Sort repos by creation date, descending
        .slice(0, 5) // Get only the first four elements
        .map(repo => (
          <div key={repo.id} className="repo-item">
            <div>
              <div className="repo-name"><a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a></div>
              <div className="repo-description">{repo.description || 'No description'}</div>
            </div>
            <div className="repo-updated">
              Updated at {new Date(repo.updated_at).toLocaleDateString()}
            </div>
          </div>
        ))}
    </div>

    </motion.div>
  );
}

export default User;
