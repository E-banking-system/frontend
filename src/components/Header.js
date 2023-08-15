import React from 'react';
import { FiMessageSquare, FiBell } from 'react-icons/fi';

function Header() {
  return (
    <div className="flex items-center">
      <div className="relative ml-2">
        <FiMessageSquare className="h-6 w-6 text-gray-500" />
        <span className="absolute top-0 right-0 rounded-full bg-red-500 text-white text-xs leading-tight px-1">
          3
        </span>
      </div>
      <div className="relative ml-2 mr-2">
        <FiBell className="h-6 w-6 text-gray-500" />
        <span className="absolute top-0 right-0 rounded-full bg-red-500 text-white text-xs leading-tight px-1">
          5
        </span>
      </div>
      <div>
        <span className="text-lg font-semibold">{localStorage.getItem("nom")} {localStorage.getItem("prenom")}</span>
        <br />
        <span className="text-sm text-gray-500 flex flex-col items-center justify-center">{localStorage.getItem("role")}</span>
      </div>
    </div>
  );
}

export default Header;
