import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: "#F5F5DC" }}
    >
      <div className="container mx-auto px-4">
        <Link
          to="/"
          className="text-[1.25rem] font-bold text-[#8B4513] hover:text-[#A0522D]"
        >
          PageTurner
        </Link>

        
          <ul className="flex space-x-6">
            <li className="nav-item">
              <Link className="text-[#8B4513] hover:underline" to="/mylist">
                My List
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="text-[#8B4513] hover:underline"
                to="/myhistories"
              >
                My Histories
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="text-[#8B4513] hover:underline"
                to="/all-users"
              >
                AdminPage
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav">
           
            <li className="nav-item">
              <button
                className="text-[#8B4513] hover:underline focus:outline-none"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      
    </nav>
  );
};

export default NavBar;
