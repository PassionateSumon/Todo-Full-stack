import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTheme } from "../../context/ThemeContext";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const Navbar = () => {
  const token = useSelector((state) => state.auth.token);
  const { theme, toggleTheme } = useTheme();

  return (
    <nav
      className={`p-4 flex justify-between items-center transition-all overflow-y-hidden ${
        theme === "dark" ? "bg-gray-200 text-black" : "bg-gray-800 text-white"
      }`}
    >
      {/* Logo */}
      <Link to="/" className="text-lg font-semibold">
        Todo App
      </Link>

      {/* Links and Toggle */}
      <div className="flex items-center">
        {/* Dark/Light Mode Toggle */}
        <button
          onClick={toggleTheme}
          className={`mr-4 p-2 rounded-lg transition ${
            theme === "dark" ? "hover:bg-gray-300" : "hover:bg-gray-600"
          }`}
        >
          {theme === "dark" ? (
            <MdLightMode size={20} className="text-black" />
          ) : (
            <MdDarkMode size={20} className="text-white" />
          )}
        </button>

        {/* Conditional Links Based on Token */}
        {token ? (
          <>
            <Link to="/profile" className="mr-4">
              Profile
            </Link>
            <Link to="/todos" className="mr-4">
              Todos
            </Link>
            <Link to="/reports" className="mr-4">
              Reports
            </Link>
          </>
        ) : (
          <Link to="/">Home</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
