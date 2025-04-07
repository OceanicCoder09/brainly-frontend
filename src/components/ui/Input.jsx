import React from "react";

export const Input = React.forwardRef(({ placeholder, type = "text", name, onChange }, ref) => {
  return (
    <div className="m-2">
      <input
        ref={ref}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        className="px-4 py-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
});
