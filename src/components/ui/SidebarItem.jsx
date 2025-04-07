import React from "react";

export function SidebarItem({ icon, text, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex items-center p-4 hover:bg-gray-200 cursor-pointer"
    >
      <div className="mr-4">{icon}</div>
      <span className="text-lg">{text}</span>
    </div>
  );
}
