import React from "react";
import "./Delete.css";

const DeleteButton = ({ onClick, isLoading, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`flex items-center justify-center px-6 py-3 
                  bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 
                  text-white font-semibold rounded-lg shadow-md
                  transition-all duration-300 ease-in-out
                  ${isLoading ? "cursor-not-allowed opacity-75" : ""}
                  ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {isLoading ? (
        <div className="loader ease-linear rounded-full border-2 border-t-2 border-white h-5 w-5"></div>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          Delete
        </>
      )}
    </button>
  );
};

export default DeleteButton;
