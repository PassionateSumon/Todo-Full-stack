import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser, signinUser } from "../../Redux/Slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const Home = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, error } = useSelector((state) => state.auth);
  const { theme } = useTheme(); // Access current theme from ThemeContext

  const handleSignup = () => {
    dispatch(signupUser({ username, password })).then((action) => {
      if (action.meta.requestStatus === "fulfilled") {
        alert("Signup successful! Please sign in.");
      }
    });
  };

  const handleSignin = () => {
    dispatch(signinUser({ username, password }));
  };

  useEffect(() => {
    if (token) navigate("/profile");
  }, [token, navigate]);

  return (
    <div
      className={`flex flex-col items-center justify-center h-screen transition-colors ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-800"
      }`}
    >
      <h1 className="text-2xl font-bold mb-4">Welcome to Todo App</h1>
      <div className="space-y-2 mb-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className={`p-2 border rounded w-64 transition-colors ${
            theme === "dark"
              ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              : "bg-white border-gray-300 text-gray-800 placeholder-gray-500"
          }`}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className={`p-2 border rounded w-64 transition-colors ${
            theme === "dark"
              ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              : "bg-white border-gray-300 text-gray-800 placeholder-gray-500"
          }`}
        />
      </div>
      <button
        onClick={handleSignup}
        className={`px-4 py-2 rounded mb-2 transition-colors ${
          theme === "dark"
            ? "bg-green-600 hover:bg-green-700 text-white"
            : "bg-green-500 hover:bg-green-600 text-white"
        }`}
      >
        Sign Up
      </button>
      <button
        onClick={handleSignin}
        className={`px-4 py-2 rounded transition-colors ${
          theme === "dark"
            ? "bg-blue-600 hover:bg-blue-700 text-white"
            : "bg-blue-500 hover:bg-blue-600 text-white"
        }`}
      >
        Sign In
      </button>
      {error && (
        <p
          className={`mt-2 text-sm transition-colors ${
            theme === "dark" ? "text-red-400" : "text-red-500"
          }`}
        >
          {error.message}
        </p>
      )}
    </div>
  );
};

export default Home;
