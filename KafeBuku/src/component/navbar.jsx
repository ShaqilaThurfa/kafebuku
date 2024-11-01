import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token"); 
    navigate('/login'); 
  };

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#F5F5DC' }}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/" style={{ color: '#8B4513' }}>PageTurner</Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" style={{ color: '#8B4513' }}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/mylist" style={{ color: '#8B4513' }}>My List</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/myhistories" style={{ color: '#8B4513' }}>My Histories</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/all-users" style={{ color: '#8B4513' }}>AdminPage</Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/login" style={{ color: '#8B4513' }}>Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register" style={{ color: '#8B4513' }}>Register</Link>
            </li>
            <li className="nav-item">
              <button 
                className="btn nav-link" 
                style={{ color: '#8B4513', border: 'none', background: 'none' }} 
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
