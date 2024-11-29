import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { logout } from "../../Redux/Slices/authSlice";
import { useDispatch } from "react-redux";

const Profile = () => {
  const [userData, setUserData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found, redirecting to login...");
          navigate("/login");
          return;
        }

        const response = await axios.get("http://localhost:3000/api/me", {
          headers: {
            token: token,
          },
          withCredentials: true,
        });

        setUserData(response.data);
      } catch (error) {
        console.error(
          "Error fetching user data:",
          error.response?.data || error.message
        );
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen dark:bg-gray-900 dark:text-white">
        <p className="text-gray-500 dark:text-gray-300 text-lg">
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <div className="dark:bg-[#232222] h-[90.8vh] w-screen overflow-hidden  ">
      <div className="max-w-xs mx-auto p-6 dark:bg-[#82858a] bg-gray-800 shadow-lg rounded-lg mt-10 transition-colors">
        <h2 className="text-2xl text-center font-semibold dark:text-[#E5E7EB] text-gray-200 mb-4">
          Profile
        </h2>
        <div className="mb-3">
          <label className="mb-1 block dark:text-[#E5E7EB] text-gray-300 font-medium">
            Username
          </label>
          <p className="px-3 py-2 dark:bg-[#F9FAFB] bg-gray-700 rounded-lg  dark:text-gray-700 text-gray-200">
            {userData.username}
          </p>
        </div>
        <div className="mb-3">
          <label className="mb-1 block dark:text-[#E5E7EB] text-gray-300 font-medium">
            Email
          </label>
          <p className="px-3 py-2 dark:bg-[#F9FAFB] bg-gray-700 rounded-lg  dark:text-gray-700 text-gray-200">
            {userData.username}
          </p>
        </div>
        <div className="mb-3">
          <label className="mb-1 block dark:text-[#E5E7EB] text-gray-300 font-medium">
            Age
          </label>
          <p className="px-3 py-2 dark:bg-[#F9FAFB] bg-gray-700 rounded-lg  dark:text-gray-700 text-gray-200">
            {userData.username}
          </p>
        </div>
        <div className=" flex items-center justify-center">
          <button
            onClick={handleLogout}
            className="bg-red-600 dark:bg-red-500 mt-2 px-4 py-2 rounded-lg text-white dark:text-gray-100 font-medium transition-colors hover:bg-red-700 dark:hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
