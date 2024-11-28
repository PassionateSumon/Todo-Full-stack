import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser, signinUser } from "../../Redux/Slices/authSlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, error } = useSelector((state) => state.auth);

  // console.log(token);

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
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Welcome to Todo App</h1>
      <div className="space-y-2 mb-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="p-2 border rounded w-64"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="p-2 border rounded w-64"
        />
      </div>
      <button
        onClick={handleSignup}
        className="bg-green-500 text-white px-4 py-2 rounded mb-2"
      >
        Sign Up
      </button>
      <button
        onClick={handleSignin}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Sign In
      </button>
      {error && <p className="text-red-500 mt-2">{error.message}</p>}
    </div>
  );
};

export default Home;
