import React from "react";
import "./Edit.css"

const EditButton = ({ onClick, isLoading, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`flex items-center justify-center px-6 py-3 
                  bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 
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
              d="M11 5h2m-1 0v10m4 4H8v-2a2 2 0 012-2h4a2 2 0 012 2v2z"
            />
          </svg>
          Edit
        </>
      )}
    </button>
  );
};

export default EditButton;
