import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../Redux/Slices/authSlice";

const Navbar = () => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  // console.log(token);

  return (
    <nav className="p-4 bg-gray-800 text-white flex justify-between">
      <Link to="/" className="text-lg font-semibold">
        Todo App
      </Link>
      <div>
        {token ? (
          <>
            <Link to="/profile" className="mr-4">
              Profile
            </Link>
            <Link to="/todos" className="mr-4">
              Todos
            </Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/">Home</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
