import React from "react";
import "./Input.css"

const InputReusable = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  required = false,
  disabled = false,
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label
          className="block text-gray-700 font-medium mb-1"
          htmlFor={label}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        id={label}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full px-4 py-2 border rounded-lg 
                    text-gray-700 bg-white shadow-sm focus:outline-none focus:ring-2
                    transition-all duration-300 ease-in-out
                    ${
                      error
                        ? "border-red-500 focus:ring-red-300"
                        : "border-gray-300 focus:ring-blue-300"
                    }
                    ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default InputReusable;
