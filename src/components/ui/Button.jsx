import React from "react";

export const Button = ({
  text,
  onClick,
  startIcon,
  endIcon,
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
}) => {
  const variantStyles = {
    primary: "bg-purple-600 text-white hover:bg-purple-700 focus:ring-4 focus:ring-purple-300",
    secondary: "bg-purple-300 text-purple-900 hover:bg-purple-400 focus:ring-4 focus:ring-purple-200",
    outline: "border border-purple-600 text-purple-600 hover:bg-purple-100 focus:ring-4 focus:ring-purple-200",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-4 focus:ring-red-300",
  };

  const sizeStyles = {
    sm: "py-2 px-4 text-sm",
    md: "py-3 px-6 text-base",
    lg: "py-4 px-8 text-lg",
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-200 shadow-sm
        ${variantStyles[variant]} ${sizeStyles[size]} ${fullWidth ? "w-full" : ""} focus:outline-none`}
      disabled={loading}
    >
      {loading ? (
        <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
      ) : (
        <>
          {startIcon && <span>{startIcon}</span>}
          <span>{text}</span>
          {endIcon && <span>{endIcon}</span>}
        </>
      )}
    </button>
  );
};
