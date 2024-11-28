import React from "react";
import "./Submit.css";

const SubmitButton = ({ onClick, isLoading, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`relative flex items-center justify-center px-6 py-3 
                  bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 
                  text-white font-semibold rounded-lg shadow-md 
                  transition-all duration-300 ease-in-out
                  ${isLoading ? "cursor-not-allowed opacity-75" : ""}
                  ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {isLoading ? (
        <div className="loader ease-linear rounded-full border-2 border-t-2 border-white h-5 w-5"></div>
      ) : (
        "Submit"
      )}
    </button>
  );
};

export default SubmitButton;
