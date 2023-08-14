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
      <span className="text-lg font-semibold mr-8">Welcome, Nom Prenom</span>
    </div>
  );
}

export default Header;
