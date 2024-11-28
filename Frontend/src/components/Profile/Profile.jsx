import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const [userData, setUserData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found, redirecting to login...");
          navigate("/login");
          return;
        }

        // console.log("Token being sent:", token);

        const response = await axios.get("http://localhost:3000/api/me", {
          headers: {
            token: token, 
          },
          withCredentials: true,
        });

        // console.log("User data:", response.data);
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Profile</h2>
      <div className="mb-4">
        <label className="block text-gray-600 font-medium">Username</label>
        <p className="px-3 py-2 bg-gray-100 rounded-lg text-gray-700">
          {userData.username}
        </p>
      </div>
    </div>
  );
};

export default Profile;
