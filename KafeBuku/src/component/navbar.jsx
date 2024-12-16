import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State untuk kontrol dropdown
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-[#F5F5DC] relative">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-[1.25rem] font-bold text-[#8B4513] hover:text-[#A0522D]"
        >
          PageTurner
        </Link>

        
        <div className="hidden lg:flex flex-grow justify-center space-x-6">
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
        </div>

      
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-[#8B4513] hover:text-[#A0522D] p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      
      <div className="hidden lg:block absolute top-0 right-5 pt-2 flex">
        <button
          className="text-[#8B4513] hover:underline focus:outline-none"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      
      {isMenuOpen && (
        <div className="lg:hidden flex flex-col items-start bg-[#F5F5DC] p-4">
          <Link className="text-[#8B4513] hover:underline my-2" to="/mylist">
            My List
          </Link>
          <Link
            className="text-[#8B4513] hover:underline my-2"
            to="/myhistories"
          >
            My Histories
          </Link>
          <Link className="text-[#8B4513] hover:underline my-2" to="/all-users">
            AdminPage
          </Link>
          <button
            className="text-[#8B4513] hover:underline my-2 focus:outline-none"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
